import User from "../../models/user.mjs";

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ msg: "Please provide both current and new passwords" });
        }
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect current password" });
        }
        
        user.password = newPassword;
        await user.save();
        
        res.status(200).json({ msg: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
