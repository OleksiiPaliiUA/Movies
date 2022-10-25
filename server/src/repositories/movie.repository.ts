import Movie from "../models/movie.model";
import { body as movieBody } from "../types/movie.body";

export default class MovieRepository {
  static create(body: movieBody) {
    return new Promise(function (resolve, reject) {
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
              message: "Movie created!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "Movie not created!",
            });
          });
      });
    });
  }
  static update(condition: any, body: movieBody) {
    return new Promise(function (resolve, reject) {
      const { time, ...data } = body;
      Movie.update(
        {
          ...data,
          time: [time],
        },
        { where: { uuid: condition } }
      )
        .then((data: any) => {
          if (data == 1) {
            resolve({
              success: true,
              message: "Movie updated!",
            });
          }
          resolve({
            success: false,
            message: "Movie not updated!",
          });
        })
        .catch((error) => {
          resolve({
            success: false,
            error,
            message: "Movie not updated!",
          });
        });
    });
  }
  static delete(condition: any) {
    return new Promise(function (resolve, reject) {
      Movie.sync().then(() => {
        Movie.destroy({ where: { uuid: condition } })
          .then((data: any) => {
            if (data == 1) {
              resolve({
                success: true,
                message: "Movie deleted!",
              });
            }
            resolve({
              success: false,
              message: "Movie not deleted!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "Movie not deleted!",
            });
          });
      });
    });
  }
  static findOneById(condition: any) {
    return new Promise(function (resolve, reject) {
      Movie.sync().then(() => {
        Movie.findOne({ where: { uuid: condition } })
          .then((data: any) => {
            if (data) {
              resolve({
                success: true,
                data,
              });
            }
            resolve({
              success: false,
              message: "Movie not found!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "Movie not found!",
            });
          });
      });
    });
  }
  static findAll() {
    return new Promise(function (resolve, reject) {
      Movie.sync().then(() => {
        Movie.findAll()
          .then((data: any) => {
            if (data) {
              resolve({
                success: true,
                data,
              });
            }
            resolve({
              success: false,
              message: "Movie not found!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "Movie not found!",
            });
          });
      });
    });
  }
}
