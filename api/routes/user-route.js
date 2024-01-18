import { Router } from "express";
import { userDelete, userSignOut, userUpdate } from "../controller/user-controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = Router();

router.get("/user/:id", verifyToken, userUpdate)
router.post("/user/update/:id", verifyToken, userUpdate)
router.post("/user/signout/:id", verifyToken, userSignOut)
router.delete("/user/delete/:id", verifyToken, userDelete)

export default router