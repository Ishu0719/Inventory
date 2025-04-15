import express from 'express';
import { createPassword, getPasswordById, updatePassword, deletePassword } from "../controllers/forgetController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createPassword", createPassword);

router.get("/getPasswordById/:id", getPasswordById);
router.put("/updatePassword/:id",  updatePassword);
router.delete("/deletePassword/:id", deletePassword);

export default router;