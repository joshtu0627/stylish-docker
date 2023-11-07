import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// for health check
router.get("/", authMiddleware, (req, res) => {
  if (req.user.role != "admin") {
    res.status(403).send("You are not admin");
    return;
  }
  res.send("this is admin route");
});

// for authenication
router.post("/auth", authMiddleware, (req, res) => {
  if (req.user.role != "admin") {
    res.status(403).send("You are not admin");
    return;
  }
  res.status(200).send("ok");
  // res.sendFile("checkoutMyself.html", { root: "./" });
});

// return a html
router.get("/checkout.html", authMiddleware, (req, res) => {
  if (req.user.role != "admin") {
    res.status(403).send("You are not admin");
    return;
  }
  res.sendFile("checkoutMyself.html", { root: "./" });
});

router.get("/tokeninput.html", (req, res) => {
  res.sendFile("tokeninput.html", { root: "./" });
});

export default router;
