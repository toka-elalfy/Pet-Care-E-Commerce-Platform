import User from "../../models/user.mjs";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -refreshToken -resetPasswordToken -resetPasswordExpire");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fname, lname, phone, notificationPreferences } = req.body;
        
        const updateFields = {};
        if (fname) updateFields.fname = fname;
        if (lname) updateFields.lname = lname;
        if (phone !== undefined) updateFields.phone = phone;
        if (notificationPreferences) updateFields.notificationPreferences = notificationPreferences;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password -refreshToken");

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
