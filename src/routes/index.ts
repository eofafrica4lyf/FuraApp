import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function(_req, res, _next) {
  console.log("lksndlksdnlskdnklsdnfk");

  // res.render("index", { title: "Express" });

  res.json({ message: "home" });
});

export default router;
