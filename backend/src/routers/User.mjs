import { Router } from "express";
import { protect } from "../middleware/authMiddleware.mjs";
import { getProfile, updateProfile } from "../controllers/User/profile.mjs";
import { changePassword } from "../controllers/User/password.mjs";
import { addAddress, updatePrimaryAddress, removeAddress } from "../controllers/User/addresses.mjs";
import User from "../models/user.mjs";

const UserRouter = Router();

UserRouter.use(protect);

UserRouter.get("/profile", getProfile);
UserRouter.put("/profile", updateProfile);
UserRouter.put("/password", changePassword);

UserRouter.post("/addresses", addAddress);
UserRouter.put("/addresses/:addressId/primary", updatePrimaryAddress);
UserRouter.delete("/addresses/:addressId", removeAddress);

// Delete account
UserRouter.delete("/account", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ msg: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
});

export default UserRouter;
