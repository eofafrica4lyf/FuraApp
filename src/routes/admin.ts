import express from "express";
var router = express.Router();
import { loginAdmin } from "../connections/mongo";

router.post("/login", async (req, res, _next) => {
  //   console.log("Got here!");
  // console.log(process.env);

  //   console.log(req.body);

  const result = await loginAdmin(req.body);
  //   console.log(result);
  //   console.log("Getting out...");

  res.status(200).json(result);
});

export default router;
