import JWT from 'jsonwebtoken';
import userModel from '../models/users.js';
//route

const reqSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, "jkdfhajkhjklhnmzbnmcxb32749867hjak",{
            expiresIn: "177d",
          });
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}
//check admin by roles =1
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.roles !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            })
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin Middleware"
            
        })
    }
}
export { reqSignIn, isAdmin }