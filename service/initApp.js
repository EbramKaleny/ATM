import { globalErrorHandler } from "../error/errorHandler.js";
import { appError } from "../error/classError.js";
import * as routers from '../routes/index.js';
import { deleteFromDB } from "../middleware/deleteFromDB.js";
import cors from "cors";
import { dbConnection } from "../DB/connectionDB.js";

export const initApp = (app, express) => {
  dbConnection();
  app.use(cors());
  app.use((req, res, next) => {
    if (req.originalUrl == "/order/webhook") {
      next();
    } else {
      express.json()(req, res, next);
    }
  });
  app.get("/", (req, res) => res.status(200).json({ msg: "hello world" }));

  app.use("/user", routers.UR)
  app.use("/account", routers.AR)

  app.all("*", (req, res, next) => {
    next(new appError("page not found", 404));
  });

  app.use(globalErrorHandler, deleteFromDB);
};
