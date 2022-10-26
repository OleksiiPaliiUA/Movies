import { rateLimit } from "express-rate-limit";
import { logEvents } from "./logger";
import { Request, Response, NextFunction } from "express";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "Too many login attempts, please try again after 60 seconds pause!",
  },
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    logEvents(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
