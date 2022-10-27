import { Request, Response } from 'express';
import { response as repoResponse } from 'src/types/response';
import MovieRepository from '../repositories/movie.repository';

export default class MovieController {
  static createMovie = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a Movie',
      });
    }
    const response: repoResponse = await MovieRepository.create(req.body);
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static updateMovie = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a body to update',
      });
    }
    const response: repoResponse = await MovieRepository.update(
      req.params.id,
      req.body,
    );
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static deleteMovie = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const response: repoResponse = await MovieRepository.delete(req.params.id);
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static getMovieById = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const response: repoResponse = await MovieRepository.findOneById(
      req.params.id,
    );
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };

  static getMovies = async (
    _req: Request,
    res: Response,
  ): Promise<Response> => {
    const response: repoResponse = await MovieRepository.findAll();
    if (response.success === false) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  };
}
