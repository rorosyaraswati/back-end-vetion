import express from "express";
import { getVegetables, getVegetableById, createVegetable, updateVegetable, deleteVegetable } from "../controller/Vegetable.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/vegetables', verifyToken, getVegetables);
router.get('/vegetables/:id', verifyToken, getVegetableById);
router.post('/vegetables', verifyToken, createVegetable);
router.put('/vegetables/:id', verifyToken, updateVegetable);
router.delete('/vegetables/:id', verifyToken, deleteVegetable);

export default router;
