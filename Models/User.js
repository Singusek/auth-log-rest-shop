import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    name:{
        type: String, 
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email:{
        type: String , required:true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    zip_code: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        format: Date,
        required: true,
    },
    expiration_date: {
        type: Date,
        default: +new Date() + 360 * 24 * 60 * 60 * 1000,
    },
    data_registration: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ["user", "admin", "worker"],
        default: 'user',
    }
});
const User = mongoose.model('user', userSchema);
export default User;