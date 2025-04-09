import Customer from "../models/customer.js";

export const createCustomer = async (req, res) => {
    try {
        const { customer_Name, email, mobile_Number, address, status } = req.body;

        if (!customer_Name || !email || !mobile_Number || !address || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        const newCustomer = await Customer.create({ customer_Name, email, mobile_Number, address, status });

        res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            customer: newCustomer
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving the customer', error: error.message });
    }
};

export const getAllCustomer = async (req, res) => {
    try {
        const customers = await Customer.find();
       res.json({ success: true, customers });   // res.data= {success: true, customers: customers}
      // res.json(customers)
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving customers', error: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        res.json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving the customer', error: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const { customer_Name, email, mobile_Number, address, status } = req.body;
        const customerId = req.params.id;

        const existingCustomer = await Customer.findById(customerId);
        if (!existingCustomer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { customer_Name, email, mobile_Number, address, status },
            { new: true }
        );

        res.json({ success: true, message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating the customer', error: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedCustomer = await Customer.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        res.json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting the customer', error: error.message });
    }
};
