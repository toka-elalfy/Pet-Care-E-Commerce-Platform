import User from "../../models/user.mjs";

export const handleLogout = async (req, res) => {
    const token = req.cookies?.refreshToken;

    if (token) {
        await User.findOneAndUpdate(
            { refreshToken: token },
            { refreshToken: null }
        );
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(200).json({ msg: "Logged out successfully" });
};