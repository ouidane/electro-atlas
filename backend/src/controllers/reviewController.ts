import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/reviewService";

class ReviewController {
  // Create review
  async createReview(req: Request, res: Response) {
    const { rating, comment } = req.body;
    const { productId } = req.params;
    const userId = req.user!.id;

    await ReviewService.createReview({ productId, userId, rating, comment });
    res.status(201).json({ message: "Review created" });
  }

  // Get reviews
  async getReviews(req: Request, res: Response) {
    const { productId } = req.params;

    const data = await ReviewService.getReviews(productId);
    res.status(200).json({ data });
  }

  // Get review
  async getReviewById(req: Request, res: Response) {
    const { reviewId, productId } = req.params;

    const data = await ReviewService.getReviewById({ reviewId, productId });
    res.status(200).json({ data });
  }

  // Update review
  async updateReview(req: Request, res: Response) {
    const { reviewId, productId } = req.params;
    const { rating, comment } = req.body;

    await ReviewService.updateReview({ reviewId, productId, rating, comment });
    res.sendStatus(204);
  }

  // Delete review
  async deleteReview(req: Request, res: Response) {
    const { reviewId, productId } = req.params;

    await ReviewService.deleteReview({ reviewId, productId });
    res.sendStatus(204);
  }
}

export const reviewController = new ReviewController();
