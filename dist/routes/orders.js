"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const mongo_1 = require("../connections/mongo");
const auth_1 = __importDefault(require("../auth/auth"));
/* GET users listing. */
router.get("/", async function(_req, res, _next) {
  const results = await mongo_1.getOrders();
  console.log(results);
  res.status(200).json(results);
});
router.post("/createOrder", async function(req, res, _next) {
  console.log("Got here!");
  console.log("req.body");
  console.log(req.body);
  console.log("Going to save it");
  const result = await mongo_1.createOrder(req.body);
  console.log("Saved it");
  console.log("What was returned");
  console.log(result);
  res.status(201).json({ data: result });
});
router.put("/removeOrder", auth_1.default, async function(req, res, _next) {
  console.log("Got here to remove files");
  console.log(req.header("x-auth-token"));
  //   console.log(req.body);
  const result = await mongo_1.removeOrder(req.body);
  console.log("Order was removed from database");
  res.status(200).json({ data: result });
});
exports.default = router;
//# sourceMappingURL=orders.js.map
