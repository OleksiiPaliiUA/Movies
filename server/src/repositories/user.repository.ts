import * as bcrypt from 'bcrypt';

import User from '../models/user.model';
import { body as userBody } from '../types/user.body';
import { response as repoResponse } from '../types/response';

export default class UserRepository {
  static async create(body: userBody): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      if (!('passwordConfirm' in body)) {
        resolve({
          success: false,
          message: 'Empty or not exist passwordConfirm field!',
        });
      }
      const { password, passwordConfirm, ...data } = body;
      if (password !== passwordConfirm) {
        resolve({
          success: false,
          message: 'Passwords do not match!',
        });
      }
      User.sync().then(async () => {
        User.create({
          ...data,
          password: await bcrypt.hash(password, 12),
        })
          .then((data: any) => {
            resolve({
              success: true,
              id: data.dataValues.uuid,
              message: 'User created!',
            });
          })
          .catch((err: any) => {
            const error =
              err.errors[0].type == 'unique violation'
                ? 'Email already exists!'
                : err;
            resolve({
              success: false,
              error,
              message: 'User not created!',
            });
          });
      });
    });
  }
  static update(condition: string, body: userBody): Promise<repoResponse> {
    const { password, ...data } = body;
    return new Promise(function (resolve: any) {
      User.sync().then(async () => {
        User.update(
          {
            ...data,
            password: await bcrypt.hash(password, 12),
          },
          { where: { uuid: condition } },
        )
          .then((data: object) => {
            if (data[0] == 1) {
              resolve({
                success: true,
                message: 'User updated!',
              });
            }
            resolve({
              success: false,
              message: 'User not updated!',
            });
          })
          .catch((error: object) => {
            resolve({
              success: false,
              error,
              message: 'User not updated!',
            });
          });
      });
    });
  }
  static delete(condition: string): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      User.destroy({ where: { uuid: condition } })
        .then((data: number) => {
          if (data == 1) {
            resolve({
              success: true,
              message: 'User deleted!',
            });
          }
          resolve({
            success: false,
            message: 'User not deleted!',
          });
        })
        .catch((error: object) => {
          resolve({
            success: false,
            error,
            message: 'User not deleted!',
          });
        });
    });
  }
  static findOneById(condition: string): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      User.findOne({ where: { uuid: condition } })
        .then((data: object) => {
          if (data) {
            resolve({
              success: true,
              data,
            });
          }
          resolve({
            success: false,
            message: 'User not found!',
          });
        })
        .catch((error: object) => {
          resolve({
            success: false,
            error,
            message: 'User not found!',
          });
        });
    });
  }
  static findOneByEmail(condition: string): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      User.findOne({ where: { email: condition } })
        .then((data: object) => {
          if (data) {
            resolve({
              success: true,
              data,
            });
          }
          resolve({
            success: false,
            message: 'User not found!',
          });
        })
        .catch((error: object) => {
          resolve({
            success: false,
            error,
            message: 'User not found!',
          });
        });
    });
  }
  static findAll(): Promise<repoResponse> {
    return new Promise(function (resolve: any) {
      User.findAll()
        .then((data: object) => {
          if (data) {
            resolve({
              success: true,
              data,
            });
          }
          resolve({
            success: false,
            message: 'Users not found!',
          });
        })
        .catch((error: object) => {
          resolve({
            success: false,
            error,
            message: 'Users not found!',
          });
        });
    });
  }
}
