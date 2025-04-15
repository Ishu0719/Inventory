import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const forgetSchema = new Schema({
   new_Password:{ type:String},
   confirm_Password:{ type:String },
   

   
}, { timestamps: true }); // Correct placement of timestamps

const Forget = model('Forget', forgetSchema);

export default Forget;
