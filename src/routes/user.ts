import express from "express";
var router = express.Router();
import { loginUser } from "../connections/mongo";

router.post("/login", async (req, res, _next) => {
  const result = await loginUser(req.body);

  res.status(200).json(result);
});

export default router;
