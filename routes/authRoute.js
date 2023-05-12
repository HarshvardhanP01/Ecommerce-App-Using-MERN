import Express from "express";
import { registerController, loginController, testController, forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from "../controllers/authController.js"
import { isAdmin, reqSignIn } from "../middlewares/authMiddlerware.js";
//obj
const router = Express.Router();
//api register
router.post('/register', registerController)
//api login
router.post('/login', loginController)
//logInReq
router.get('/test', reqSignIn, isAdmin, testController);
//forget password
router.post("/forgot-password", forgetPasswordController);

//auth
router.get("/user-auth", reqSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//admin route
router.get("/admin-auth", reqSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", reqSignIn, updateProfileController);


//orders
router.get("/orders", reqSignIn, getOrdersController);

//all orders
router.get("/all-orders", reqSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  reqSignIn,
  isAdmin,
  orderStatusController
);




export { router }
