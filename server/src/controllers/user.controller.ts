import { NextFunction, Request, Response } from "express";
import { response as repoResponse } from "src/types/response";
import UserRepository from "../repositories/user.repository";
import * as asyncHandler from "express-async-handler";

export default class UserController {
  static createUser = asyncHandler(async (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        error: "You must provide a User",
      });
    } else {
      const response: repoResponse = await UserRepository.create(req.body);
      if (response.success === false) {
        res.status(400).json(response);
      } else {
        res.status(201).json(response);
      }
    }
  });

  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    } else {
      const response: repoResponse = await UserRepository.update(
        req.params.id,
        req.body
      );
      if (response.success === false) {
        res.status(400).json(response);
      } else {
        res.status(201).json(response);
      }
    }
  });

  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const response: repoResponse = await UserRepository.delete(req.params.id);
    if (response.success === false) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  });

  static getUserById = asyncHandler(async (req: Request, res: Response) => {
    const response: repoResponse = await UserRepository.findOneById(
      req.params.id
    );
    if (response.success === false) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  });

  static getUsers = asyncHandler(async (req: Request, res: Response) => {
    const response: repoResponse = await UserRepository.findAll();
    if (response.success === false) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  });
}
