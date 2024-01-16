import { Router } from "express";
import { userDelete, userSignOut, userUpdate } from "../controller/user-controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = Router();

router.post("/update/:id", verifyToken, userUpdate)
router.post("/signout/:id", verifyToken, userSignOut)
router.delete("/delete/:id", verifyToken, userDelete)

export default router