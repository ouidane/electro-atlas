import createError from "http-errors";
import { User, Profile } from "../models";
import { ROLE } from "../utils/constants";
import {
  buildMongoFilter,
  buildSortQuery,
  FIELD_TYPES,
  FieldConfigMap,
  RawFilters,
} from "../utils/queryHelpers";
import {
  CreateUserType,
  GetUsersQueryType,
  UpdateUserType,
} from "../middlewares";

export class UserService {
  private static usersFilterQuery(filters: unknown) {
    const customConfig: FieldConfigMap = {
      query: {
        type: FIELD_TYPES.TEXT,
        searchFields: ["profile.fullName", "email"],
      },
      isVerified: { type: FIELD_TYPES.BOOLEAN },
      role: { type: FIELD_TYPES.IN },
      "profile.address.city": {
        type: FIELD_TYPES.IN,
        searchField: "city",
      },
      "profile.address.country": {
        type: FIELD_TYPES.IN,
        searchField: "country",
      },
    };

    return buildMongoFilter(filters as RawFilters, customConfig);
  }

  private static userSortQuery(sort: string) {
    const AllowedSortFields = {
      familyName: { field: "profile.familyName" },
      givenName: { field: "profile.givenName" },
    };

    return buildSortQuery(sort, AllowedSortFields);
  }

  static async getUsers(queryParams: GetUsersQueryType) {
    const { limit, page, sort, filters } = queryParams;

    const queryObject = this.usersFilterQuery(filters);
    const sortCriteria = this.userSortQuery(sort);

    const aggregate = User.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "userId",
          as: "profile",
        },
      },
      { $unwind: "$profile" },
      { $match: queryObject },
      {
        $project: {
          _id: 1,
          email: 1,
          isVerified: 1,
          role: 1,
          createdAt: 1,
          updatedAt: 1,
          profile: 1,
        },
      },
      { $sort: sortCriteria },
    ]);

    const options = { page, limit };
    const result = await User.aggregatePaginate(aggregate, options);

    return result;
  }

  static async getUserById(userId: string) {
    const user = await User.findById(userId)
      .populate({
        path: "profile",
        select: "-__v -createdAt -updatedAt",
        options: { lean: true },
      })
      .select("_id email isVerified profile role createdAt updatedAt")
      .lean();

    if (!user) {
      throw createError(404, "User not found");
    }

    return user;
  }

  static async updateProfileByUserId(userId: string, userData: UpdateUserType) {
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({ userId });
    }

    Object.assign(profile, {
      familyName: userData.familyName,
      givenName: userData.givenName,
      phone: userData.phone,
      address: {
        line1: userData.address?.line1,
        line2: userData.address?.line2,
        postalCode: userData.address?.postalCode,
        country: userData.address?.country,
        city: userData.address?.city,
      },
    });

    await profile.save();
    return profile;
  }

  static async updateUserById(userId: string, userData: UpdateUserType) {
    const user = await User.findById(userId);
    if (!user) {
      throw createError(404, "User not found");
    }

    if (userData.role) {
      user.role = userData.role as (typeof ROLE)[keyof typeof ROLE];
    }

    await user.save();
    return user;
  }

  static async deleteUserById(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw createError(404, "User not found");
    }
    return user;
  }
}
