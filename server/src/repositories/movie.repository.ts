import Movie from '../models/movie.model';
import { body as movieBody } from '../types/movie.body';
import { response as repoResponse } from '../types/response';

export default class MovieRepository {
  static create(body: movieBody): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      const { time, ...data } = body;
      Movie.sync().then(() => {
        Movie.create({
          ...data,
          time: [time],
        })
          .then((data: any) => {
            resolve({
              success: true,
              id: data.dataValues.uuid,
              message: 'Movie created!',
            });
          })
          .catch((error: object) => {
            resolve({
              success: false,
              error,
              message: 'Movie not created!',
            });
          });
      });
    });
  }
  static update(condition: string, body: movieBody): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      const { time, ...data } = body;
      Movie.update(
        {
          ...data,
          time: [time],
        },
        { where: { uuid: condition } },
      )
        .then((data: object) => {
          if (data[0] == 1) {
            resolve({
              success: true,
              message: 'Movie updated!',
            });
          }
          resolve({
            success: false,
            message: 'Movie not updated!',
          });
        })
        .catch((error: object) => {
          resolve({
            success: false,
            error,
            message: 'Movie not updated!',
          });
        });
    });
  }
  static delete(condition: string): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      Movie.sync().then(() => {
        Movie.destroy({ where: { uuid: condition } })
          .then((data: number) => {
            if (data == 1) {
              resolve({
                success: true,
                message: 'Movie deleted!',
              });
            }
            resolve({
              success: false,
              message: 'Movie not deleted!',
            });
          })
          .catch((error: object) => {
            resolve({
              success: false,
              error,
              message: 'Movie not deleted!',
            });
          });
      });
    });
  }
  static findOneById(condition: string): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      Movie.sync().then(() => {
        Movie.findOne({ where: { uuid: condition } })
          .then((data: object) => {
            if (data) {
              resolve({
                success: true,
                data,
              });
            }
            resolve({
              success: false,
              message: 'Movie not found!',
            });
          })
          .catch((error: object) => {
            resolve({
              success: false,
              error,
              message: 'Movie not found!',
            });
          });
      });
    });
  }
  static findAll(): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      Movie.sync().then(() => {
        Movie.findAll()
          .then((data: object) => {
            if (data) {
              resolve({
                success: true,
                data,
              });
            }
            resolve({
              success: false,
              message: 'Movie not found!',
            });
          })
          .catch((error: object) => {
            resolve({
              success: false,
              error,
              message: 'Movie not found!',
            });
          });
      });
    });
  }
}
