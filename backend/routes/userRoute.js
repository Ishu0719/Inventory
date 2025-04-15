import express from 'express';
import { createUser,getAllUser,getUserById,updateUser,deleteUser} from "../controllers/userController.js";
const router = express.Router();


router.post("/createUser", createUser);
router.get("/getAllUser", getAllUser);
router.get("/getUserById/:id", getUserById);
router.put("/updateUser/:id",  updateUser);
router.delete("/deleteUser/:id", deleteUser);


export default router;