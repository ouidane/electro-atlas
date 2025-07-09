import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { GetUsersQueryType } from "../middlewares";
import paginateResponse from "../utils/paginateResponse";

class UserController {
  // =============== Current User Operations ===============

  async getCurrentUser(req: Request, res: Response) {
    const userId = req.user!.id;
    const data = await UserService.getUserById(userId);

    res.status(200).json({ data });
  }

  async updateCurrentUser(req: Request, res: Response) {
    const userId = req.user!.id;
    await UserService.updateProfileByUserId(userId, req.body);

    res.status(200).json({ message: "User updated successfully" });
  }

  // =============== User Management Operations ===============

  async getUsers(req: Request, res: Response) {
    const queryParams = req.parsedQuery as GetUsersQueryType;
    const baseUrl = `${req.baseUrl}${req.path}`;

    const result = await UserService.getUsers(queryParams);
    const resultWithPagination = paginateResponse(result, queryParams, baseUrl);
    res.status(200).json(resultWithPagination);
  }

  // =============== User CRUD Operations by ID ===============

  async getUserById(req: Request, res: Response) {
    const userId = req.params.userId;
    const data = await UserService.getUserById(userId);

    res.status(200).json({ data });
  }

  async updateUserById(req: Request, res: Response) {
    const userId = req.params.userId;

    await Promise.all([
      UserService.updateUserById(userId, req.body),
      UserService.updateProfileByUserId(userId, req.body),
    ]);

    res.status(200).json({ message: "User updated successfully" });
  }

  async deleteUserById(req: Request, res: Response) {
    const userId = req.params.userId;
    await UserService.deleteUserById(userId);

    res.status(200).json({ message: "User deleted successfully" });
  }
}

export const userController = new UserController();
