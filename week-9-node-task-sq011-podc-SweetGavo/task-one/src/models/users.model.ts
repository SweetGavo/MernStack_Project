import mongoose, { model } from "mongoose";



export const userSchema = new mongoose.Schema({
    firstName: String,
    lastname: String,
    DOB: Date,
   
    email: {
    type: String,
    unique: true

},
    phone_number:{
    type: Number,
    unique: true,
    required: [true, 'Phone number is required'],

    },
    password: {
    type: String,
    required: true,
  },
  account: {
    type: Number,
    unique: true
  }
    
  
})

export const User = model('User', userSchema)
