
import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const createUser= async (req, res) => {
    try {
        const { user_Name,password ,email} = req.body;
        if( !user_Name||
            !password||
            !email) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }
        const existingUser = await User.findOne({ user_Name });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }
      const hashedPassword = await bcrypt.hash(password,10 ); // You should hash the password before saving it

        await User.create({user_Name,password:hashedPassword,email})
       
        res.status(201).json({
            success: true,
            message: 'user created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the user', details: error.message });
    }
};
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message: error.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user id not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { user_Name,
            password,
            email,
            } = req.body;
        const userId = req.params.id; 

        const existingUser= await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const updateData = {
            user_Name,
            password,
            email,
           
        };

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,
            message: 'user updated successfully',
            supplier: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const deletedUsers = await User.findByIdAndDelete(userId); 
        if (!deletedUsers) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json({
            success: true,
            message: 'user deleted successfully' });
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};

