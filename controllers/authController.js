import { compared, hashed } from "../helpers/authHelper.js";
import userModel from "../models/users.js"
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
//REGISTER
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name) {
            return res.send({ message: "Enter Name" });
        }
        if (!email) {
            return res.send({ message: "Enter Email" });
        }
        if (!password) {
            return res.send({ message: "Enter Password" });
        }
        if (!phone) {
            return res.send({ message: "Enter phone" });
        }
        if (!address) {
            return res.send({ message: "Enter Address" });
        }
        if (!answer) {
            return res.send({ message: "Enter Answer" });
        }
        //Checking for existing user
        const exuser = await userModel.findOne({ email });

        //validating with existing
        if (exuser) {
            res.status(200).send({
                success: false,
                message: "Already Registered"
            })
        }
        //registering new user
        const hashing = await hashed(password);
        const user = await new userModel({ name, email, address, phone, password: hashing, answer }).save();
        res.status(201).send({
            success: true,
            message: "registered Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Not Registered",
            error
        })
    }
}


//LOGIN 
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Incorrect Details Entered"
            })
        }
        const user = await userModel.findOne({ email })
        if (!email) {
            res.status(500).send({
                success: false,
                message: "User not Found"
            })
        }
        const match = await compared(password, user.password)
        if (!match) {
            res.status(404).send({
                success: false,
                message: "Password Invalid"
            })
            return;
        }
        //JWT TOKEN
        const token = JWT.sign({ _id: user._id }, "jkdfhajkhjklhnmzbnmcxb32749867hjak", {
            expiresIn: "177d",
        })
        res.status(200).send({
            success: true,
            message: "logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                roles: user.roles
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Login Failed",
            error
        })
    }
}

//frgt passwrd
const forgetPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email is Required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'answer is Required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'New Password is Required' })
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Something really went wrong buddy'
            })
        }
        const hashe = await hashed(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashe })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went Wrong',
            error
        })
    }
}

//LogInReq
const testController = (req, res) => {
    res.send("Hello")
}


//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashed(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


  
//orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };

export { registerController, loginController, testController, forgetPasswordController }