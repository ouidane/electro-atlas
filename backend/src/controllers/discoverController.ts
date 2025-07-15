import { Request, Response, NextFunction } from "express";
import { DiscoverService } from "../services/discoverService";
import { QueryFiltersType } from "../middlewares/validateProduct";

export const discoverService = new DiscoverService();

class DiscoverController {
  // Get best offers
  async bestOffers(req: Request, res: Response, next: NextFunction) {
    const data = await discoverService.getBestOffersByCategory();
    res.status(200).json({ data });
  }

  // Get best sellers
  async bestSeller(req: Request, res: Response, next: NextFunction) {
    const data = await discoverService.getBestSellersByCategory();
    res.status(200).json({ data });
  }

  // Products filter
  async productsFilter(req: Request, res: Response, next: NextFunction) {
    const queryfilters = req.parsedQuery as QueryFiltersType;

    const data = await discoverService.getProductsFilter(queryfilters);
    res.status(200).json({ data });
  }

  // Get recommended products
  async recommendedProducts(req: Request, res: Response, next: NextFunction) {
    const { categoryId, excludeProductId } = req.query;

    const data = await discoverService.getRecommendedProducts(
      categoryId as string,
      excludeProductId as string,
    );

    res.status(200).json({ data });
  }
}

export const discoverController = new DiscoverController();
