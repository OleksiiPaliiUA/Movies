import allowedOrigins from "./allowedOrigins";
import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: (origin: string, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors!"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
