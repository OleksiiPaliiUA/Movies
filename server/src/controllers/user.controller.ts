import { Request, Response } from 'express';
import { response as repoResponse } from 'src/types/response';
import UserRepository from '../repositories/user.repository';

export default class UserController {
  static createUser = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a User',
      });
    }
    const response: repoResponse = await UserRepository.create(req.body);
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static updateUser = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a body to update',
      });
    }
    const response: repoResponse = await UserRepository.update(
      req.params.id,
      req.body,
    );
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static deleteUser = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const response: repoResponse = await UserRepository.delete(req.params.id);
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static getUserById = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const response: repoResponse = await UserRepository.findOneById(
      req.params.id,
    );
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static getUsers = async (_req: Request, res: Response): Promise<Response> => {
    const response: repoResponse = await UserRepository.findAll();
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };
}
