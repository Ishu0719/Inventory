import express from 'express';
import { createCustomer, getAllCustomer, getCustomerById, updateCustomer, deleteCustomer } from "../controllers/customerController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createCustomer", createCustomer);
router.get("/getAllCustomer", getAllCustomer);
router.get("/getCustomerById/:id", getCustomerById);
router.put("/updateCustomer/:id",  updateCustomer)
router.delete("/deleteCustomer/:id", deleteCustomer);

export default router;