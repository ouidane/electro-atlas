import { PassportStatic } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User, Profile } from "../models";
import crypto from "crypto";
import { ROLE } from "./constants";
import config from "../config/config";

export default (passport: PassportStatic): void => {
  // Serialize user
  passport.serializeUser((user: typeof User.prototype, done) => {
    // serialize the user with the information from the database
    return done(null, {
      id: user._id.toString(),
      role: user.role,
    });
  });

  // Deserialize user
  passport.deserializeUser(
    async (userData: { id: string; role: string }, done) => {
      // Fetch user data from the database based on serialized information
      const user = await User.findById(userData.id)
        .select("_id role platform email")
        .lean();
      if (!user) {
        return done(new Error("User not found"), null);
      }

      // Return user data
      const result = {
        id: user._id.toString(),
        role: user.role,
      };
      return done(null, result);
    },
  );

  // Google Strategies
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: config.auth.google.clientId,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: "/api/v1/auth/google/callback",
      },
      async (token, refreshToken, profile, done) => {
        const email = profile.emails?.[0].value;
        const givenName = profile.name?.givenName;
        const familyName = profile.name?.familyName;
        const googleId = profile.id;

        if (!email) {
          return done(new Error("Failed to obtain user email from Google"));
        }

        const user = await User.findOne({
          $or: [{ email }, { googleId }],
        });

        if (user) {
          return done(null, {
            id: user._id.toString(),
            role: user.role,
          });
        }

        const generatePassword = crypto.randomBytes(40).toString("hex");
        const newUser = await User.create({
          email,
          googleId,
          role: ROLE.BUYER,
          password: generatePassword,
          confirmPassword: generatePassword,
          isVerified: true,
          verified: new Date(),
        });

        await Profile.create({
          givenName,
          familyName,
          userId: newUser._id,
        });

        // Returning the full user data for the new user
        return done(null, {
          id: newUser._id.toString(),
          role: newUser.role,
        });
      },
    ),
  );
};
