import { Request, Response } from "express";
import { response as repoResponse } from "src/types/response";
import MovieRepository from "../repositories/movie.repository";

export default class MovieController {
  static createMovie(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a movie",
      });
    }
    MovieRepository.create(req.body).then((response: repoResponse) => {
      if (response.success === false) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    });
  }
  static updateMovie(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }
    MovieRepository.update(req.params.id, req.body).then(
      (response: repoResponse) => {
        if (response.success === false) {
          return res.status(400).json(response);
        }
        return res.status(201).json(response);
      }
    );
  }

  static deleteMovie(req: Request, res: Response) {
    MovieRepository.delete(req.params.id).then((response: repoResponse) => {
      if (response.success === false) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    });
  }

  static getMovieById(req: Request, res: Response) {
    MovieRepository.findOneById(req.params.id).then(
      (response: repoResponse) => {
        if (response.success === false) {
          return res.status(400).json(response);
        }
        return res.status(201).json(response);
      }
    );
  }

  static getMovies(req: Request, res: Response) {
    MovieRepository.findAll().then((response: repoResponse) => {
      if (response.success === false) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    });
  }
}
