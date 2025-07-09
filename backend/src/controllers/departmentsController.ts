import { Request, Response, NextFunction } from "express";
import { Category } from "../models";

export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allDepartments = await Category.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "_id",
        foreignField: "categoryId",
        as: "subCategories",
        pipeline: [{ $sort: { createdAt: 1 } }, { $project: { name: 1 } }],
      },
    },
    { $sort: { createdAt: 1 } },
    { $project: { name: 1, subCategories: 1 } },
  ]);

  res.status(200).json({ allDepartments });
};
