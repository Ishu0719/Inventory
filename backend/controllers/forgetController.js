import Forget_Password from "../models/forget.js";

export const createPassword = async (req, res) => {
    try {
        const { new_Password,confirm_Password } = req.body;

        if (!new_Password||!confirm_Password) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        const newPassword = await Forget_Password.create({ new_Password,confirm_Password });

        res.status(201).json({
            success: true,
            message: 'Password created successfully',
            password: newPassword
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving the new password', error: error.message });
    }
};

export const getAllPassowrd = async (req, res) => {
    try {
        const passwords= await Forget_Password.find();
       res.json({ success: true, passwords });   
      
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving passwords', error: error.message });
    }
};

export const getPasswordById = async (req, res) => {
    try {
        const passwordId = req.params.id;
        const password= await Forget_Password.findById(passwordId);

        if (!password) {
            return res.status(404).json({ success: false, message: 'password not found' });
        }

        res.json({ success: true, password });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving the password', error: error.message });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { new_Password,confirm_Password } = req.body;
        const passwordId = req.params.id;

        const existingPassword = await Forget_Password.findById(passwordId);
        if (!existingPassword) {
            return res.status(404).json({ success: false, message: 'password not found' });
        }

        const updatedPassword = await Forget_Password.findByIdAndUpdate(
            passwordId,
            { new_Password,confirm_Password },
            { new: true }
        );

        res.json({ success: true, message: 'password updated successfully', password: updatedPassword });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating the password', error: error.message });
    }
};

export const deletePassword = async (req, res) => {
    try {
        const passwordId = req.params.id;
        const deletedPassword = await Forget_Password.findByIdAndDelete(passwordId);

        if (!deletedPassword) {
            return res.status(404).json({ success: false, message: 'Password not found' });
        }

        res.json({ success: true, message: 'Password deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting the password', error: error.message });
    }
};
