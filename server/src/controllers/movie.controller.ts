import { Request, Response } from "express";
import { response as repoResponse } from "src/types/response";
import * as asyncHandler from "express-async-handler";
import MovieRepository from "../repositories/movie.repository";

export default class MovieController {
  static createMovie = asyncHandler(async (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        error: "You must provide a movie",
      });
    } else {
      const response: repoResponse = await MovieRepository.create(req.body);
      if (response.success === false) {
        res.status(400).json(response);
      } else {
        res.status(201).json(response);
      }
    }
  });
  static updateMovie = asyncHandler(async (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    } else {
      const response: repoResponse = await MovieRepository.update(
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

  static deleteMovie = asyncHandler(async (req: Request, res: Response) => {
    const response: repoResponse = await MovieRepository.delete(req.params.id);
    if (response.success === false) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  });

  static getMovieById = asyncHandler(async (req: Request, res: Response) => {
    const response: repoResponse = await MovieRepository.findOneById(
      req.params.id
    );
    if (response.success === false) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  });

  static getMovies = asyncHandler(async (req: Request, res: Response) => {
    const response: repoResponse = await MovieRepository.findAll();
    if (response.success === false) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  });
}
