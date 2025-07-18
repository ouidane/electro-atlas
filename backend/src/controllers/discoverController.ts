import { Request, Response, NextFunction } from "express";
import { DiscoverService } from "../services/discoverService";
import { QueryFiltersType } from "../middlewares/validateProduct";

export const discoverService = new DiscoverService();

class DiscoverController {
  // Get best offers
  async bestOffers(req: Request, res: Response, next: NextFunction) {
    const {
      categoryId,
      subCategoryId,
    }: { categoryId?: string; subCategoryId?: string } = req.query;

    const data = await discoverService.getBestOffers({
      categoryId,
      subCategoryId,
    });

    res.status(200).json({ data });
  }

  // Get best sellers
  async bestSeller(req: Request, res: Response, next: NextFunction) {
    const {
      categoryId,
      subCategoryId,
    }: { categoryId?: string; subCategoryId?: string } = req.query;

    const data = await discoverService.getBestSellers({
      categoryId,
      subCategoryId,
    });

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
    const {
      categoryId,
      subCategoryId,
      excludeProductId,
    }: {
      categoryId?: string;
      subCategoryId?: string;
      excludeProductId?: string;
    } = req.query;

    const data = await discoverService.getRecommendedProducts({
      categoryId,
      subCategoryId,
      excludeProductId,
    });

    res.status(200).json({ data });
  }
}

export const discoverController = new DiscoverController();
