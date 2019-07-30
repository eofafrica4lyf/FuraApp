import express from "express";
var router = express.Router();
import { createOrder, getOrders, removeOrder } from "../connections/mongo";
import auth from "../auth/auth";

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

router.put("/removeOrder", auth, async function(req, res, _next) {
  console.log("Got here to remove files");
  console.log(req.header("x-auth-token"));

  //   console.log(req.body);
  const result = await removeOrder(req.body);
  console.log("Order was removed from database");
  res.status(200).json({ data: result });
});

export default router;
