import express from "express";
var router = express.Router();
import { createOrder, getOrders, removeOrder } from "../connections/mongo";
import authUser from "../auth/authUser";
import decode from "../auth/decode";

/* GET users listing. */
router.get("/", async function(_req, res, _next) {
  const results = await getOrders();

  res.status(200).json(results);
});

router.post("/createOrder", async function(req, res, _next) {
  const result = await createOrder(req.body);

  res.status(201).json({ data: result });
});

router.put("/removeOrder", [decode, authUser], async function(
  req: any,
  res: any,
  _next: any
) {
  const result = await removeOrder(req.body);

  if (result.deleted) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router;
