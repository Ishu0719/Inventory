import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    user_Name: { type: String },
    password: { type: String },
    email: { type: String },
   
   

   
}, { timestamps: true }); // Correct placement of timestamps

const User = model('User', userSchema);

export default User;
