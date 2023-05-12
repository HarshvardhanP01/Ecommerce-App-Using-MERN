import express from "express";
import {
    createProductController, updateProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController
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

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);


//payment
router.post("/braintree/payment", reqSignIn, brainTreePaymentController);
export default router;