import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    roles:
    {
        type:Number,
        default:0
    }

},
{
    timestamps:true,
    versionKey:false
});

export default mongoose.model('users',userSchema);