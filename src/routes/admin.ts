import express from "express";
var router = express.Router();
import { loginAdmin } from "../connections/mongo";

router.post("/login", async (req, res, _next) => {
  const result = await loginAdmin(req.body);

  res.status(200).json(result);
});

export default router;
