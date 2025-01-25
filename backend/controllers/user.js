import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../middlewares/sendMails.js";

export const register = async (req, res) => {
    try {
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

        // Generate activation token
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

        // Send email
        await sendMail(email, 'E-learning Account Activation', data);

        return res.status(200).json({
            success: true,
            message: 'OTP has been sent to your email.',
        });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};