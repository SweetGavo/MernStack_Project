import mongoose from "mongoose";
import user from "mongoose";



const userSchema = new user.Schema({
    firstName: String,
    lastname: String,
    DOB: Date,
   
    email: {
    type: String,
    unique: true

},
    phone_number:{
    type: Number,
    unique: true

    },
    password: {
    type: String,
    required: true,
  },
    
})

module.exports = user.model('user', userSchema)
// export const user = mongoose.model("userService", userSchema);
