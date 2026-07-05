import InfoPage from "../../models/infoPage.mjs";

export const getInfoPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await InfoPage.findOne({ slug });
        if (!page) {
            return res.status(404).json({ msg: `Info page '${slug}' not found` });
        }
        return res.status(200).json({ page });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
