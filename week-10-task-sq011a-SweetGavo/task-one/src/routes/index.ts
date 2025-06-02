import express from "express";
const router = express.Router();
const { UserDetails } = require("../controller/userController");

/* GET home page. */
router.get("/", UserDetails);
router.get("/home", UserDetails);

export default router;
