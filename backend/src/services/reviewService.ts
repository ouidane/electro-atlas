import createError from "http-errors";
import { Review, Product } from "../models";

export class ReviewService {
  private static async updateProductReview(productId: string) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Product not found");
    }

    const reviews = await Review.find({ productId });

    // Calculate total number of reviews and total rating
    const totalReviews = reviews.length;
    if (totalReviews === 0) {
      product.reviews.count = 0;
      product.reviews.avgRate = 0;
      product.reviews.roundAvgRate = 0;
      await product.save();
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / totalReviews;

    // Update product's review fields
    product.reviews.count = totalReviews;
    product.reviews.avgRate = parseFloat(averageRating.toFixed(2));
    product.reviews.roundAvgRate = Math.round(averageRating);

    await product.save();
  }

  static async createReview({
    productId,
    userId,
    rating,
    comment,
  }: {
    productId: string;
    userId: string;
    rating: number;
    comment: string;
  }) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Product not found");
    }

    const newReview = new Review({
      rating,
      comment,
      userId,
      productId,
    });

    await newReview.save();
    await this.updateProductReview(productId);
  }

  static async getReviews(productId: string) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Product not found");
    }

    const result = await Review.find({ productId })
      .populate({
        path: "user",
        select: "-_id familyName givenName userId",
        options: { lean: true },
      })
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    return result;
  }

  static async getReviewById({
    reviewId,
    productId,
  }: {
    reviewId: string;
    productId: string;
  }) {
    const review = await Review.findOne({ _id: reviewId, productId })
      .populate({
        path: "user",
        select: "-_id familyName givenName userId",
        options: { lean: true },
      })
      .select("-__v")
      .lean();

    if (!review) {
      throw createError(404, "Review not found");
    }

    return review;
  }

  static async updateReview({
    reviewId,
    productId,
    rating,
    comment,
  }: {
    reviewId: string;
    productId: string;
    rating: number;
    comment: string;
  }) {
    const review = await Review.findOne({ _id: reviewId, productId });
    if (!review) {
      throw createError(404, "Review not found");
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();
    await this.updateProductReview(productId);
  }

  static async deleteReview({
    reviewId,
    productId,
  }: {
    reviewId: string;
    productId: string;
  }) {
    const review = await Review.findOneAndDelete({ _id: reviewId, productId });
    if (!review) {
      throw createError(404, "Review not found");
    }

    await this.updateProductReview(productId);
  }
}
