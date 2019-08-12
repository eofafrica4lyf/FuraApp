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
const authUser_1 = __importDefault(require("../auth/authUser"));
const decode_1 = __importDefault(require("../auth/decode"));
/* GET users listing. */
router.get("/", async function(_req, res, _next) {
  const results = await mongo_1.getOrders();
  res.status(200).json(results);
});
router.post("/createOrder", async function(req, res, _next) {
  const result = await mongo_1.createOrder(req.body);
  res.status(201).json({ data: result });
});
router.put(
  "/removeOrder",
  [decode_1.default, authUser_1.default],
  async function(req, res, _next) {
    const result = await mongo_1.removeOrder(req.body);
    if (result.deleted) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  }
);
exports.default = router;
//# sourceMappingURL=orders.js.map
