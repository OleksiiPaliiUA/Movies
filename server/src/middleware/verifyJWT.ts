import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!',
    });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: object, decoded: Record<string, string | number>) => {
      if (err)
        return res.status(403).json({ success: false, message: 'Forbidden' });
      next();
    },
  );
};

export default verifyJWT;
