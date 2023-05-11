import express from "express";
import {
    createProductController, updateProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController
} from "../controllers/productController.js";
import { isAdmin, reqSignIn } from "../middlewares/authMiddlerware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
    "/create-product",
    reqSignIn,
    isAdmin,
    formidable(),
    createProductController
);
//routes
router.put(
    "/update-product/:pid",
    reqSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/product/:pid", deleteProductController);

export default router;