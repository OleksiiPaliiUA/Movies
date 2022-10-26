import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";
import { sign as cookieSign, verify as cookieVerify } from "jsonwebtoken";
import * as asyncHandler from "express-async-handler";

import { response as repoResponse } from "src/types/response";
import UserRepository from "../repositories/user.repository";
import UserController from "./user.controller";

export default class AuthController {
  static login = asyncHandler(async (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        error: "You must provide a User",
      });
    } else {
      const response: repoResponse = await UserRepository.findOneByEmail(
        req.body.email
      );
      try {
        if (
          !(await compare(req.body.password, response.data.dataValues.password))
        ) {
          res.status(406).json({
            success: false,
            message: "Invalid credentials",
          });
        } else {
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
            sameSite: "none",
            expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),
          });
          res.json({ accessToken });
        }
      } catch (TypeError) {
        res.status(406).json({
          success: false,
          message: "Email not found!",
        });
      }
    }
  });
  static refresh = asyncHandler(async (req: Request, res: Response) => {
    // const cookies: any = req.cookies;
    // if (!cookies?.jwt)
    //   res.status(401).json({
    //     success: false,
    //     message: "Unauthorized",
    //   });
    // const refreshToken: any = cookies.jwt;
    // cookieVerify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // asyncHandler(async (err: any, decoded: any) => {
    //   if (err)
    //     res.status(403).json({
    //       success: false,
    //       message: "Forbidden",
    //     });
    //   UserRepository.findOneByEmail(decoded.email).then((foundUser: any) => {
    //     if (foundUser.success === false) res.status(401).json(foundUser);
    //   });
    // });
  });
  static logout = asyncHandler(async (req: Request, res: Response) => {
    res.status(202).clearCookie("jwt").json({
      success: true,
      message: "Successfully logout",
    });
  });
}
