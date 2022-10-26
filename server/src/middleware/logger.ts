import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { promises, existsSync } from "fs";
import { join } from "path";
import { Request, Response, NextFunction } from "express";

const logEvents = async (message: string, logFileName: string) => {
  const dateTime: string = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem: string = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!existsSync(join(__dirname, "..", "logs"))) {
      await promises.mkdir(join(__dirname, "..", "logs"));
    }
    await promises.appendFile(
      join(join(__dirname, "..", "logs", logFileName)),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "regLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
