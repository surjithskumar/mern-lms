import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail, { sendForgotMail } from "../middlewares/sendMails.js";
import TryCatch from "../middlewares/TryCatch.js";

// User Registration Function
export const register = TryCatch(async (req, res) => {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });

    // Check if the user already exists
    if (user) {
        return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    user = {
        name,
        email,
        password: hashPassword,
    };

    // Generate a 6-digit OTP
    const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

    // Generate activation token with a short expiration time
    const activationToken = jwt.sign(
        { user, otp },
        process.env.Activation_Secret,
        { expiresIn: '5m' }
    );

    // Prepare email data
    const data = {
        name,
        otp,
    };

    // Send email with OTP
    await sendMail(email, 'E-learning Account Activation', data);

    return res.status(200).json({
        success: true,
        message: 'OTP has been sent to your email.',
        activationToken,
    });
});

// OTP Verification and User Creation Function
export const verifyUser = TryCatch(async (req, res) => {
    const { otp, activationToken } = req.body;

    let verify;
    try {
        // Verify the activation token
        verify = jwt.verify(activationToken, process.env.Activation_Secret);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or expired activation token.',
        });
    }

    // Check if the OTP matches
    if (verify.otp !== String(otp)) {
        return res.status(400).json({
            success: false,
            message: 'Wrong OTP. Please try again.',
        });
    }

    // Create the user in the database
    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password,
    });

    return res.status(200).json({
        success: true,
        message: 'User registered successfully!',
    });
});

export const loginUser = TryCatch(async(req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user) return res.status(400).json({
        message:'No User registered with this email'
    });

    const mathPassword = await bcrypt.compare(password, user.password);

    if(!mathPassword)
        return res.status(400).json({
            message:'Wrong Password',
        });

    const token = jwt.sign({_id: user._id}, process.env.jwt_sec,{
        expiresIn: "15d"
    });
    
    res.json({
        message:`Welcome back ${user.name}`,
        token,
        user,
    })
});

export const myProfile = TryCatch(async(req,res) => {
    const user = await User.findById(req.user._id)

    res.json({user})
})

export const forgotPassword = TryCatch(async(req,res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user)
        return res.status(404).json({
            message: "No User with this email",
    });

    const token = jwt.sign({email},process.env.Forgot_Secret)

    const data = {email,token};

    await sendForgotMail("E Learning",data);

    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    res.json({
        message:"Reset password Link is send to your mail",
    });
});

export const resetPassword = TryCatch(async(req,res) => {
   const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret); 

   const user = await User.findOne({email: decodedData.email});

   if(!user) return res.status(404).json({
    message:"No user with this Email",
   });

   if(user.resetPasswordExpire === null)
    return res.status(400).json({
        message:"Token Expired",
    });

   if(user.resetPasswordExpire < Date.now()){
    return res.status(400).json({
        message:"Token Expired",
    });
   }
   
   const password = await bcrypt.hash(req.body.password,10)

   user.password = password

   user.resetPasswordExpire = null;

   await user.save();

   res.json({message: "Password Reset"});
})