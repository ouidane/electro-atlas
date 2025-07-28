import { Request, Response, NextFunction } from "express";
import { DiscoverService } from "../services/discoverService";
import { QueryFiltersType } from "../middlewares/validateProduct";
import {
  BestOffersType,
  BestSellingType,
  RecommendationType,
} from "../middlewares";

export const discoverService = new DiscoverService();

class DiscoverController {
  // Get best offers
  async bestOffers(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.parsedQuery as BestOffersType;
    const data = await discoverService.getBestOffers(queryParams);

    res.status(200).json({ data });
  }

  // Get best sellers
  async bestSeller(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.parsedQuery as BestSellingType;
    const data = await discoverService.getBestSellers(queryParams);

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
    const queryParams = req.parsedQuery as RecommendationType;
    const data = await discoverService.getRecommendedProducts(queryParams);

    res.status(200).json({ data });
  }
}

export const discoverController = new DiscoverController();
