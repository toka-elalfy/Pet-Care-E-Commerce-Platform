import crypto from "crypto";
import User from "../../models/user.mjs";

export const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ msg: "User not found with this email" });
        }

        const token = crypto.randomBytes(20).toString("hex");

        await User.findByIdAndUpdate(user._id, {
            resetPasswordToken: token,
            resetPasswordExpire: Date.now() + 3600000 // 1 hour
        });

        const resetUrl = `http://localhost:5173/reset-password/${token}`;

        console.log("========================================");
        console.log(`PASSWORD RECOVERY REQUEST RECEIVED FOR: ${email}`);
        console.log(`RESET LINK: ${resetUrl}`);
        console.log("========================================");

        return res.status(200).json({
            msg: "Recovery email sent successfully (simulated)",
            resetUrl
        });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
