import { logEvents } from "./logger";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status: number = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: err.message });
};

export default errorHandler;
