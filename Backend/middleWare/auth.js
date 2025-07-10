const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req,res, next) => {

    try{
       const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode;

        } catch(err){
            return  res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();

    } catch(error){
        return res.status(401).json({
                success:false,
                message:"Something went wrong"
            })
    }
}

// exports.isCustomer = (req,res, next) => {
//     try{
//         if(req.user.role !== "Customer"){
//              return res.status(401).json({
//                 success:false,
//                 message:"This route is not for Customer"
//             })
//         }

//     } catch(err) {
//          return res.status(401).json({
//                 success:false,
//                 message:"User Role is not matching"
//             })

//     }
    
// }

// exports.isAdmin = (req,res, next) => {
//     try{
//         if(req.user.role !== "Admin"){
//              return res.status(401).json({
//                 success:false,
//                 message:"This route is not for Admin"
//             })
//         }

//     } catch(err) {
//          return res.status(401).json({
//                 success:false,
//                 message:"User Role is not matching"
//             })

//     }
    
// }