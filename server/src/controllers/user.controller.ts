import { Request, Response } from "express";
import { response as repoResponse } from "src/types/response";
import UserRepository from "../repositories/user.repository";

export default class UserController {
  static createUser(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a User",
      });
    }
    UserRepository.create(req.body).then((response: repoResponse) => {
      if (response.success === false) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    });
  }

  static updateUser(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }
    UserRepository.update(req.params.id, req.body).then(
      (response: repoResponse) => {
        if (response.success === false) {
          return res.status(400).json(response);
        }
        return res.status(201).json(response);
      }
    );
  }

  static deleteUser(req: Request, res: Response) {
    UserRepository.delete(req.params.id).then((response: repoResponse) => {
      if (response.success === false) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    });
  }

  static getUserById(req: Request, res: Response) {
    UserRepository.findOneById(req.params.id).then((response: repoResponse) => {
      if (response.success === false) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    });
  }

  static getUsers(req: Request, res: Response) {
    UserRepository.findAll().then((response: repoResponse) => {
      if (response.success === false) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    });
  }
}
