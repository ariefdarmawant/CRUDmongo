import mongoose from 'mongoose';

const User = mongoose.Schema({
    username:{
        type: String, 
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['User','Admin'],
        default: 'User',
    }
})

export default mongoose.model('Users',User)