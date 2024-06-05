import express from "express";
import { Loginto, Logout, Register} from "../controllers/userController.js";

const router = express.Router();
router.route("/register").post(Register);
router.route("/login").post(Loginto);
router.route("/logout").get(Logout);


export default router;