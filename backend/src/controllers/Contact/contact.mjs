import Contact from "../../models/contact.mjs";

export const createContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        return res.status(201).json({ msg: "Message sent successfully", ticket: newContact });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json({ messages });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
