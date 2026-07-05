import FAQ from "../../models/faq.mjs";

export const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        return res.status(200).json({ faqs });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
