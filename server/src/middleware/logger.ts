import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import * as fs from "fs";
const fsPromises = fs.promises;
import * as path from "path";
import { Request, Response, NextFunction } from "express";

const logEvents = async (message: string, logFileName: string) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(path.join(__dirname, "..", "logs", logFileName)),
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
