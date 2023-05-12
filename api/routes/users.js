import express from "express";
const router = express.Router();
import { createUser, getALLUser,deleteUser ,updateUser } from '../controllers/users';

router.post("/inscription", createUser);
router.get("/users", getALLUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;