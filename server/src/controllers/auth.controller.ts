import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { response as repoResponse } from 'src/types/response';
import UserRepository from '../repositories/user.repository';

export default class AuthController {
  static login = async (req: Request, res: Response): Promise<Response> => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a User',
      });
    }
    const response: repoResponse = await UserRepository.findOneByEmail(
      req.body.email,
    );
    try {
      if (
        !(await bcrypt.compare(
          req.body.password,
          response.data.dataValues.password,
        ))
      ) {
        return res.status(406).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
      const accessToken: string = jwt.sign(
        {
          UserInfo: {
            fullName: response.data.dataValues.fullName,
            email: response.data.dataValues.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' },
      );
      const refreshToken: string = jwt.sign(
        {
          email: response.data.dataValues.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '7d',
        },
      );
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),
      });
      return res.json({ accessToken });
    } catch (TypeError) {
      return res.status(406).json({
        success: false,
        message: 'Email not found!',
      });
    }
  };
  static refresh = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    const refreshToken: string = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err: object, decoded: any) => {
        console.log(decoded);
        if (err)
          return res.status(403).json({
            success: false,
            message: 'Forbidden',
          });
        const response: repoResponse = await UserRepository.findOneByEmail(
          decoded.email,
        );
        if (response.success === false)
          return res.status(401).json({
            success: false,
            message: 'Unauthorized!',
          });
        const accessToken: string = jwt.sign(
          {
            UserInfo: {
              fullName: response.data.dataValues.fullName,
              email: response.data.dataValues.email,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1d' },
        );
        return res.json({ accessToken });
      },
    );
  };
  static logout = async (req: Request, res: Response): Promise<Response> => {
    if (!req.cookies?.jwt) return res.sendStatus(204);
    return res.status(202).clearCookie('jwt').json({
      success: true,
      message: 'Successfully logout',
    });
  };
}
