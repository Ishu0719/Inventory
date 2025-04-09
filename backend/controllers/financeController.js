
import Finance from "../models/finance.js";

export const createFinance = async (req, res) => {
    try {
        const { name,
        amount,
        transaction,
        category,
        payment_Mode,
        status,
            } = req.body;
        if(!name || !amount || !transaction || !category || !payment_Mode||  !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Finance.create({  name,
            amount,
            transaction,
            category,
            payment_Mode,
            status,})
        res.status(201).json({
            success: true,
            message: 'finance created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the finance', details: error.message });
    }
};

export const getAllFinance = async (req, res) => {
    try {
        const finances = await Finance.find();
        res.json(finances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getFinanceById = async (req, res) => {
    try {
        const financeId = req.params.id;
        const finance = await Finance.findById(financeId);
        if (!finance) {
            return res.status(404).json({
                success:false,
                message: 'finance id not found' });
        }
        res.json(finance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFinance = async (req, res) => {
    try {
        const {  name,
            amount,
            transaction,
            category,
            payment_Mode,
            status,
             } = req.body;
        const financeId = req.params.id; 

        const existingFinance= await Finance.findById(financeId);
        if (!existingFinance) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        const updateData = {
            name,
            amount,
            transaction,
            category,
            payment_Mode,
            status,
            
        };

        const updatedFinance = await Finance.findByIdAndUpdate(
            financeId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'finance updated successfully',
            finance: updatedFinance
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteFinance = async (req, res) => {
    try {
        const financeId = req.params.id; 
        const deletedFinance = await Finance.findByIdAndDelete(financeId); 
        if (!deletedFinance) {
            return res.status(404).json({ message: 'finance not found' });
        }
        res.json({
            success:true,
            message: 'finance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};