import express from 'express';
import { createDiscount, getAllDiscount, getDiscountById, updateDiscount, deleteDiscount } from "../controllers/discountController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createDiscount", createDiscount);
router.get("/getAllDiscount", getAllDiscount);
router.get("/getDiscountById/:id", getDiscountById)
router.put("/updateDiscount/:id",  updateDiscount)
router.delete("/deleteDiscount/:id", deleteDiscount)
//   jhjbghgbh
// inijiji
export default router;