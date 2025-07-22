const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const util = require('util');
const verifyToken = util.promisify(jwt.verify); 
require("dotenv").config()
const nodemailer = require("nodemailer");


exports.changePassword = async(req,res) => {
    try{
        // token and password extraction
        const token =  req.headers.authorization?.split(' ')[1] || req.cookies?.token;
        const {currentPassword , newPassword} = req.body;

        // token checking
        if(!token) return res.status(401).json({ error: "No token provided" });


        if (!currentPassword || !newPassword) return res.status(400).json({ error: "Both current and new passwords are required" });


        const decoded = await verifyToken(token,process.env.JWT_SECRET)
        const user = await User.findOne({email: decoded?.email})

        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(401).json({ error: "Current password is incorrect" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Password couldn't be updated", error: err.message });
    }
};

exports.login = async (req,res) => {

    try{
        const {email, password, rememberMe} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully"
            })
        }

        const user = await User.findOne({email}).lean();

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in."
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
            image:user.image,
            name:user.name,
            isVerified:user.isVerified,
        }
        if(await bcrypt.compare(password,user.password)){

            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:rememberMe ? '30d' : '2h',})

            const options = {
                httpOnly:true,
                sameSite: "None",
                secure: true,
                expires: rememberMe
                    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
                    : 0, // Session cookie (deleted when browser closes)
            };

            delete user.password;
            res.cookie("token" , token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Login successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Login Failure"
        })
    }
  
}

exports.signup = async (req,res) => {

      try{
        const {name,email, password, role} = req.body;
        const existingUser = await User.findOne({email});


        // checking if user exist or not
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already exist"
            })
        }

        // passwordhash
        let hashedPassword = await bcrypt.hash(password,10)

        // user data create in data base
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isVerified: false, 
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        });

        // otp and otpToken creation
        const otp = Math.floor(1000 + Math.random() * 9000);
        let otpToken = jwt.sign({ email, otp, exp: Math.floor(Date.now() / 1000) + 10 * 60 },process.env.JWT_SECRET)
        // Mail credentials 
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS 
            },
        });
        
        const mailOptions = {
            from: '"The Freelancer" <thefreelancers27@gmail.com>',
            to: email,
            subject: "Verify Your Email Address",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
                <h2 style="text-align: center; color: #333;">Email Verification</h2>
                <p style="font-size: 16px; color: #555;">
                    Thank you for signing up with <strong>The Freelancer</strong>. To complete your registration, please verify your email address by using the code below:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; font-size: 24px; letter-spacing: 8px; padding: 10px 20px; background-color: #f2f2f2; border-radius: 6px; color: #000; font-weight: bold;">
                    ${otp}
                    </span>
                </div>
                <p style="font-size: 14px; color: #888;">
                    This code will expire in 2 minutes. If you didn’t create an account, you can safely ignore this email.
                </p>
                <p style="font-size: 14px; color: #888;">— The Freelancer Team</p>
                </div>
            `
        };


        try {
            const info = await transporter.sendMail(mailOptions);
                // console.log("Email sent:", info.messageId);
        } catch (error) {
                console.error("Email send error:", error);
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
            image: user.image,
            name: user.name,
            isVerified: user.isVerified,
        };
        // Token creation
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
                sameSite: "None",
                secure: true,
            }

       const { password: _, ...safeUser } = user.toObject();
    //   sending cookie
        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Account created successfully",
            user: safeUser,
            otpToken
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Account cannot be registered,please try again"
        })
    }
}
exports.otp = async(req,res) =>  {
    
   try{
        const  {token}  = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
        return res.status(400).json({
            success: false,
            message: "Verification token is missing in otp",
        });
        } 
        let decoded;
        try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token",
        });
        }
        const user = await User.findOne({ email: decoded.email });

        const now = new Date();
        const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

        user.otpRequestTimestamps = user.otpRequestTimestamps.filter(ts => ts > tenMinutesAgo);

        if (user.otpRequestTimestamps.length >= 3) {
            return res.status(429).json({
                success: false,
                message: "OTP request limit exceeded. Please try again after 10 minutes."
            });
        }
        user.otpRequestTimestamps.push(now);
        await user.save();

        const otp = Math.floor(1000 + Math.random() * 9000);
        let otpToken = jwt.sign({ email: decoded.email, otp, exp: Math.floor(Date.now() / 1000) + 10 * 60 },process.env.JWT_SECRET)
        // Mail credentials 
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS 
            },
        });
            
        const mailOptions = {
        from: '"The Freelancer" <thefreelancers27@gmail.com>',
        to: decoded.email,
        subject: "Your OTP Code (Resent) – Verify Your Email",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="text-align: center; color: #1d4ed8;">Resend: Email Verification Code</h2>
            
            <p style="font-size: 16px; color: #444;">
                It looks like you requested a new verification code for your <strong>The Freelancer</strong> account.
            </p>

            <p style="font-size: 16px; color: #444;">
                Please use the following code to verify your email address:
            </p>

            <div style="text-align: center; margin: 25px 0;">
                <span style="display: inline-block; font-size: 28px; letter-spacing: 10px; padding: 12px 24px; background-color: #f3f4f6; border: 2px dashed #d1d5db; border-radius: 8px; color: #111827; font-weight: bold;">
                ${otp}
                </span>
            </div>

            <p style="font-size: 14px; color: #666;">
                This code will expire in <strong>2 minutes</strong>. If you did not request this, you can safely ignore this email.
            </p>

            <p style="font-size: 14px; color: #999; margin-top: 24px;">— The Freelancer Support Team</p>
            </div>
        `
        };


        try {
            const info = await transporter.sendMail(mailOptions);
                // console.log("Email sent:", info.messageId);
        } catch (error) {
                console.error("Email send error:", error);
        }

        //   sending cookie
        return res.status(200).json({
            success: true,
            message: "Otp send successfully",
            otpToken
        })
   } catch(err){
        res.status(401).json({
                success: false,
                message:"Something went worng",
                error:err
        })
   }
}
exports.forgetPassword = async(req,res) =>  {
    try{
       const  {email}  = req.body;

        const user = await User.findOne({ email});

        if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
        }

        // ⏱ Rate limiting check
        const now = new Date();
        const windowStart = new Date(now.getTime() - 10 * 60 * 1000); // 10 min window

        // Clean old timestamps
        user.otpRequestTimestamps = user.otpRequestTimestamps.filter(ts => ts > windowStart);

        // Check limit
        if (user.otpRequestTimestamps.length >= 3) {
        return res.status(429).json({
            success: false,
            message: "Too many OTP requests. Please try again later.",
        });
        }

        // Save current timestamp and continue
        user.otpRequestTimestamps.push(now);
        await user.save();

        const otp = Math.floor(1000 + Math.random() * 9000);

        if(!user){
            return res.status(400).json({
                success:false,
                message: 'User not found.',
            })
        }

        const otpToken = jwt.sign({email, otp , exp: Math.floor(Date.now() / 1000) + 10 * 60 },process.env.JWT_SECRET)

        // Mail credentials 
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS 
            },
        });
            
        const mailOptions = {
        from: '"The Freelancer" <thefreelancers27@gmail.com>',
        to: email,
        subject: "Reset Your Password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="text-align: center; color: #333;">Reset Your Password</h2>
            <p style="font-size: 16px; color: #555;">
                We received a request to reset your password. Use the verification code below to proceed:
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; font-size: 24px; letter-spacing: 8px; padding: 10px 20px; background-color: #f2f2f2; border-radius: 6px; color: #000; font-weight: bold;">
                ${otp}
                </span>
            </div>
            <p style="font-size: 14px; color: #888;">
                This code will expire in 2 minutes. If you didn’t request a password reset, please ignore this email or contact support.
            </p>
            <p style="font-size: 14px; color: #888;">— The Freelancer Team</p>
            </div>
        `
        };


        try {
            const info = await transporter.sendMail(mailOptions);
                // console.log("Email sent:", info.messageId);
        } catch (error) {
                console.error("Email send error:", error);
        }
        // //   sending cookie
        res.cookie("token",otpToken,{
        httpOnly: true,
        sameSite: "None",
        secure: true, // true in production with HTTPS
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        })
        
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
            otpToken
        })
    } catch(err){
        res.status(401).json({
            success: false,
            message:"Something went worng",
            error:err
        })
    }
}
exports.otpverification = async (req, res) => {
  try {

    const { token, otp } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing",
      });
    }

    // Verify token
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.otp.toString() !== otp?.toString().trim()) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }

    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Otp is verify",
    });

  } catch (err) {
    console.error("Email verification error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};
exports.newPassword = async(req,res) => {
    try{
        // token and password extraction
        const token =  req.headers.authorization?.split(' ')[1] || req.cookies?.token;
        const {newPassword} = req.body;

        // token checking
        if(!token) return res.status(401).json({ error: "No token provided" });


        // if (!currentPassword || !newPassword) return res.status(400).json({ error: "Both current and new passwords are required" });


        const decoded = await verifyToken(token,process.env.JWT_SECRET)
        const user = await User.findOne({email: decoded?.email})

        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS 
            },
        });
            
        const mailOptions = {
            from: '"The Freelancer" <thefreelancers27@gmail.com>',
            to: decoded?.email,
            subject: "Your Password Has Been Changed",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
                <h2 style="text-align: center; color: #333;">Password Changed Successfully</h2>
                <p style="font-size: 16px; color: #555;">
                    This is a confirmation that your password for <strong>The Freelancer</strong> account was successfully changed.
                </p>
                <p style="font-size: 14px; color: #555;">
                    If you did not make this change, please reset your password immediately or contact our support team.
                </p>
                <p style="font-size: 14px; color: #888;">— The Freelancer Team</p>
                </div>
            `
        };

        try {
            const info = await transporter.sendMail(mailOptions);
                // console.log("Email sent:", info.messageId);
        } catch (error) {
                console.error("Email send error:", error);
        }


        // const isMatch = await bcrypt.compare(currentPassword, user.password);
        // if (!isMatch) return res.status(401).json({ error: "Current password is incorrect" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Password couldn't be updated", error: err.message });
    }
};
exports.verifyEmail = async (req, res) => {
  try {

    const { token, otp } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing",
      });
    }

    // Verify token
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.otp.toString() !== otp?.toString().trim()) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }

    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Find user and update isVerified
    const user = await User.findOne({ email: decoded.email });

    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   });
    // }

    // if (user.isVerified) {
    //   return res.status(200).json({
    //     success: true,
    //     message: "Email already verified",
    //   });
    // }

    const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS 
        },
    });
            
    const mailOptions = {
        from: '"The Freelancer" <thefreelancers27@gmail.com>',
        to: decoded?.email,
        subject: "Welcome to The Freelancer!",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="text-align: center; color: #333;">Welcome to The Freelancer 🎉</h2>
            <p style="font-size: 16px; color: #555;">
                Your email has been successfully verified. We're thrilled to have you onboard!
            </p>
            <p style="font-size: 16px; color: #555;">
                You can now access all features, connect with clients or freelancers, and get started on your journey.
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <a href= ${process.env.FRONTEND_URL}target="_blank" style="background-color: #007bff; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">Explore Platform</a>
            </div>
            <p style="font-size: 14px; color: #888;">
                If you have any questions, feel free to reach out to our support team anytime.
            </p>
            <p style="font-size: 14px; color: #888;">— The Freelancer Team</p>
            </div>
        `
    };


    try {
        const info = await transporter.sendMail(mailOptions);
            console.log("Email sent:", info.messageId);
    } catch (error) {
            console.error("Email send error:", error);
    }

    user.isVerified = true;
    await user.save();

    const payload = {
        email:user.email,
        id:user._id,
        image:user.image,
        name:user.name,
        isVerified:true,
    }
    
    const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.cookie("token",newToken,{
      httpOnly: true,
      sameSite: "None",
      secure: true, // true in production with HTTPS
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    })
        const { password: _, ...safeUser } = user.toObject();
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user:safeUser,
    });

  } catch (err) {
    console.error("Email verification error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

exports.deleteAccount = async(req,res) => {

    try{
        const {email} = req.body;


        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOneAndDelete({email:email})

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
        message: "Account deleted successfully",
        deletedUser: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        });

    } catch (err) {
        console.error("Error deleting account:", err);
        return res.status(500).json({ message: "Internal server error" });
  }

     
}









