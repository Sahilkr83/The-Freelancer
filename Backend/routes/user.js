const express = require("express");
const router = express.Router();

const {login, signup,verifyEmail,changePassword,otp,forgetPassword,otpverification,newPassword,deleteAccount} = require("../controller/Auth")
const {auth, isCustomer, isAdmin} = require("../middleWare/auth")

router.post("/login",login);
router.post("/signup",signup);
router.post("/verify-email", verifyEmail);
router.post("/otp-verify", otpverification);
router.post("/change-password", changePassword);
router.post("/resend-otp", otp);
router.post("/forget-password", forgetPassword);
router.post("/new-password", newPassword);
router.post("/delete-account", deleteAccount);



//Protected Ruote
router.get("/me", auth, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
        message: "User authenticated"
    });
});

router.get("/test", auth,(req,res) =>{
    res.json({
        succes:true,
        message:"Welcome to the Protected route for testing"
    })
})
// logut cookie clear

router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'None',  // Allow cross-origin
    secure: true       // Required with SameSite=None
  });
  res.json({ message: 'Logged out successfully' });
});


// router.get("/customer", auth, isCustomer ,(req,res) =>{
//     res.json({
//         succes:true,
//         message:"Welcome to the Protected route for Customer"
//     })
// })
// router.get("/admin", auth, isAdmin ,(req,res) =>{
//     res.json({
//         succes:true,
//         message:"Welcome to the Protected route for Admin"
//     })
// })


module.exports = router;
