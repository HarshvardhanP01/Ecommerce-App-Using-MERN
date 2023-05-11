import express from "express";
import { isAdmin,reqSignIn } from "../middlewares/authMiddlerware.js";
import {
 createCategoryController,updateCategoryController,deleteCategoryController,categoryControlller,singleCategoryController
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  reqSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  reqSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  reqSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;