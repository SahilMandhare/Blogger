import { Router } from "express";
import { signin, signup } from "../controller/auth-controller.js";

const router = Router();

router.post("/create", signup)
router.post("/validate", signin)

export default router