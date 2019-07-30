"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("./routes/index"));
const orders_1 = __importDefault(require("./routes/orders"));
const admin_1 = __importDefault(require("./routes/admin"));
var app = express_1.default();
// view engine setup
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "jade");
app.use(morgan_1.default("dev"));
// Setup Request logging
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  morgan_1.default(logFormat, {
    skip: function(_req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);
app.use(
  morgan_1.default(logFormat, {
    skip: function(_req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);
app.disable("x-powered-by");
app.use(compression_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/api", index_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/admin", admin_1.default);
const clientDirectory = path_1.default.join(__dirname, "../", "client/build");
if (
  fs_1.default.existsSync(clientDirectory) &&
  process.env.NODE_ENV !== "development"
) {
  app.use(express_1.default.static(clientDirectory));
  app.get("/*", (_req, res) => {
    res.sendFile(path_1.default.join(clientDirectory, "index.html"));
  });
}
// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(http_errors_1.default(404));
});
// error handler
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
exports.default = app;
//# sourceMappingURL=app.js.map
