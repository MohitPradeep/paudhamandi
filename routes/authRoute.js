import express from "express";
import {registerController, loginController, testController,
   updateProfileController, getOrdersController, getAllOrdersController, 
   orderStatusController,}
 from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { forgotPasswordController } from "../controllers/authController.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes || GET
router.get("/test", requireSignIn,isAdmin, testController);

//protected User Auth routes
router.get("/user-auth", requireSignIn, (req, res) =>{
    res.status(200).send({ ok:true});
});

//protected Admin Auth routes
router.get("/admin-auth", requireSignIn, isAdmin,(req, res) =>{
    res.status(200).send({ ok:true});
});


// update profile
router.put('/profile', requireSignIn, updateProfileController);//

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;