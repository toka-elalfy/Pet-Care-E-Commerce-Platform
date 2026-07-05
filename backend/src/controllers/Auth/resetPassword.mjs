import User from "../../models/user.mjs";

export const handleResetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ msg: "Token and password are required" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid or expired password reset token" });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(200).json({ msg: "Password has been reset successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
