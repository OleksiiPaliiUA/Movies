import { hash } from "bcrypt";

import User from "../models/user.model";
import { body as userBody } from "../types/user.body";

export default class UserRepository {
  static create(body: userBody): any {
    return new Promise(function (resolve, reject) {
      if (!("passwordConfirm" in body)) {
        resolve({
          success: false,
          message: "Empty or not exist passwordConfirm field!",
        });
      }
      const { password, passwordConfirm, ...data } = body;
      if (password !== passwordConfirm) {
        resolve({
          success: false,
          message: "Passwords do not match!",
        });
      }
      User.sync().then(async () => {
        User.create({
          ...data,
          password: await hash(password, 12),
        })
          .then((data: any) => {
            resolve({
              success: true,
              id: data.dataValues.uuid,
              message: "User created!",
            });
          })
          .catch((error) => {
            const errorMessage =
              error.errors[0].type == "unique violation"
                ? "Email already exists!"
                : error;
            resolve({
              success: false,
              errorMessage,
              message: "User not created!",
            });
          });
      });
    });
  }
  static update(condition: any, body: userBody): any {
    const { password, ...data } = body;
    return new Promise(async function (resolve, reject) {
      User.update(
        {
          ...data,
          password: await hash(password, 12),
        },
        { where: { uuid: condition } }
      )
        .then((data: any) => {
          if (data == 1) {
            resolve({
              success: true,
              message: "User updated!",
            });
          }
          resolve({
            success: false,
            message: "User not updated!",
          });
        })
        .catch((error) => {
          resolve({
            success: false,
            error,
            message: "User not updated!",
          });
        });
    });
  }
  static delete(condition: any): any {
    return new Promise(function (resolve, reject) {
      User.sync().then(() => {
        User.destroy({ where: { uuid: condition } })
          .then((data: any) => {
            if (data == 1) {
              resolve({
                success: true,
                message: "User deleted!",
              });
            }
            resolve({
              success: false,
              message: "User not deleted!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "User not deleted!",
            });
          });
      });
    });
  }
  static findOneById(condition: any): any {
    return new Promise(function (resolve, reject) {
      User.sync().then(() => {
        User.findOne({ where: { uuid: condition } })
          .then((data: any) => {
            if (data) {
              resolve({
                success: true,
                data,
              });
            }
            resolve({
              success: false,
              message: "User not found!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "User not found!",
            });
          });
      });
    });
  }
  static findOneByEmail(condition: string): any {
    return new Promise(function (resolve, reject) {
      User.sync().then(() => {
        User.findOne({ where: { email: condition } })
          .then((data: any) => {
            if (data) {
              resolve({
                success: true,
                data,
              });
            }
            resolve({
              success: false,
              message: "User not found!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "User not found!",
            });
          });
      });
    });
  }
  static findAll(): any {
    return new Promise(function (resolve, reject) {
      User.sync().then(() => {
        User.findAll()
          .then((data: any) => {
            if (data) {
              resolve({
                success: true,
                data,
              });
            }
            resolve({
              success: false,
              message: "Users not found!",
            });
          })
          .catch((error) => {
            resolve({
              success: false,
              error,
              message: "Users not found!",
            });
          });
      });
    });
  }
}
