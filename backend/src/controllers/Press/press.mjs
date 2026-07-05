import PressRelease from "../../models/pressRelease.mjs";

export const getPressReleases = async (req, res) => {
    try {
        const releases = await PressRelease.find().sort({ createdAt: -1 });
        return res.status(200).json({ releases });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
