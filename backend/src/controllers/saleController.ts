import { Request, Response, NextFunction } from "express";
import { SaleService } from "../services/saleService";
import paginateResponse from "../utils/paginateResponse";
import { GetSalesQueryType } from "../middlewares";

class SaleController {
  // Get sales
  async getSales(req: Request, res: Response) {
    const queryParams = req.parsedQuery as GetSalesQueryType;
    const baseUrl = `${req.baseUrl}${req.path}`;

    const result = await SaleService.getSales(queryParams);
    const resultWithPagination = paginateResponse(result, queryParams, baseUrl);
    res.status(200).json(resultWithPagination);
  }

  async getSaleById(req: Request, res: Response) {
    const saleId = req.params.saleId;
    const data = await SaleService.getSaleById(saleId);
    res.status(200).json({ data });
  }

  async updateRefundStatus(req: Request, res: Response) {
    const { saleId } = req.params;
    const refundedQuantity = req.body.refundedQuantity as number;
    await SaleService.updateRefundStatus(saleId, refundedQuantity);

    res.sendStatus(204);
  }
}

export const saleController = new SaleController();
