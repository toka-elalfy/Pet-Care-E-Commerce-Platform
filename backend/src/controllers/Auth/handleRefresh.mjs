import jwt from "jsonwebtoken";
import User from "../../models/user.mjs";

export const handleRefresh = async (req, res) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
        return res.status(401).json({ msg: "No refresh token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const targetUser = await User.findById(decoded.id);

        
        if (!targetUser || targetUser.refreshToken !== token) {
            return res.status(403).json({ msg: "Invalid refresh token" });
        }

        
        const accessToken = jwt.sign(
            { id: targetUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        
        const newRefreshToken = jwt.sign(
            { id: targetUser._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        await targetUser.updateOne({ refreshToken: newRefreshToken });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ accessToken });

    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired refresh token" });
    }
};