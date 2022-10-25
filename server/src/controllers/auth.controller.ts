import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign as cookieSign } from "jsonwebtoken";
import { response as repoResponse } from "src/types/response";
import UserRepository from "../repositories/user.repository";
import UserController from "./user.controller";

export default class AuthController {
  static register(req: Request, res: Response) {
    UserController.createUser(req, res);
  }
  static login(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a User",
      });
    }
    UserRepository.findOneByEmail(req.body.email).then(
      async (response: repoResponse) => {
        if (
          !(await compare(req.body.password, response.data.dataValues.password))
        ) {
          return res.status(406).json({
            success: false,
            message: "Invalid credentials",
          });
        }
        const accessToken = cookieSign(
          {
            fullName: response.data.dataValues.fullName,
            email: response.data.dataValues.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        const refreshToken = cookieSign(
          {
            email: response.data.dataValues.email,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),
        });
        return res.json({ accessToken });
      }
    );
  }
  static logout(req: Request, res: Response) {
    return res.status(202).clearCookie("jwt").json({
      success: true,
      message: "Successfully logout",
    });
  }
  static refresh(req: Request, res: Response) {}
}
