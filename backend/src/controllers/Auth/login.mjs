import user from "../../models/user.mjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";


export const handleLogin = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "msg": "Email and Passpword are required" })
        }
        const targetUser = await user.findOne({ email });
        if (!targetUser) return res.status(401).json({ "msg": "User not found" });
        const match = await targetUser.comparePassword(password);
        if (!match) {
            return res.status(400).json({ "msg": "Wrong Password" });
        }
        const accessToken = jwt.sign(
            {
                id: targetUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            { id: targetUser._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: targetUser._id,
                email: targetUser.email,
                username: targetUser.username,
            },
        });
    } catch (err) {
        return res.status(500).json({ "msg": "Internal Server Error", err: err.message });
    }
}