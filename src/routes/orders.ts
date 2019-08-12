import express from "express";
var router = express.Router();
import { createOrder, getOrders, removeOrder } from "../connections/mongo";
import authUser from "../auth/authUser";
import decode from "../auth/decode";

/* GET users listing. */
router.get("/", async function(_req, res, _next) {
  const results = await getOrders();
  console.log(results);

  res.status(200).json(results);
});

router.post("/createOrder", async function(req, res, _next) {
  console.log("Got here!");
  console.log("req.body");
  console.log(req.body);

  console.log("Going to save it");
  const result = await createOrder(req.body);
  console.log("Saved it");
  console.log("What was returned");
  console.log(result);

  res.status(201).json({ data: result });
});

router.put("/removeOrder", [decode, authUser], async function(
  req: any,
  res: any,
  _next: any
) {
  console.log("Got here to remove files");
  console.log('req.header("x-auth-token")');
  console.log(req.header("x-auth-token"));

  console.log("req.body");
  console.log(req.body);

  const result = await removeOrder(req.body);
  console.log("Final result");
  console.log(result);

  // console.log("Order was removed from database");
  if (result.deleted) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router;
