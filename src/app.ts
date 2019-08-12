import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import fs from "fs";

import indexRouter from "./routes/index";
import ordersRouter from "./routes/orders";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
// Setup Request logging
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  logger(logFormat, {
    skip: function(_req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);

app.use(
  logger(logFormat, {
    skip: function(_req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);

app.disable("x-powered-by");
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

const clientDirectory = path.join(__dirname, "../", "client/build");
if (fs.existsSync(clientDirectory) && process.env.NODE_ENV !== "development") {
  app.use(express.static(clientDirectory));

  app.get("/*", (_req, res) => {
    res.sendFile(path.join(clientDirectory, "index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, _next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
