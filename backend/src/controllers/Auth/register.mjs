import user from "../../models/user.mjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";


export const handleRegister = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fname, lname, email, password } = req.body;

        const username = `${fname} ${lname}`.toLowerCase();
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }


        const existingUser = await user.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ msg: "Username or Email already exists" });
        }


        const newUser = await user.create({ username, email, password });


        const accessToken = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const refreshToken = jwt.sign(
            { id: newUser._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(201).json({
            msg: "User registered successfully",
            accessToken,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
}