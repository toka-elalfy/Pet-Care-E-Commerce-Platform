import User from "../../models/user.mjs";

export const addAddress = async (req, res) => {
    try {
        const { label, street, city, postalCode, country, isPrimary } = req.body;
        
        if (!street || !city || !postalCode || !country) {
            return res.status(400).json({ msg: "Street, city, postalCode, and country are required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (isPrimary) {
            // Set all other addresses to not primary
            user.addresses.forEach(addr => addr.isPrimary = false);
        }

        const newAddress = { label, street, city, postalCode, country, isPrimary: isPrimary || false };
        user.addresses.push(newAddress);
        
        await user.save();
        return res.status(201).json({ msg: "Address added successfully", addresses: user.addresses });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const updatePrimaryAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const user = await User.findById(req.user.id);
        
        if (!user) return res.status(404).json({ msg: "User not found" });

        const addressExists = user.addresses.find(addr => addr._id.toString() === addressId);
        if (!addressExists) {
            return res.status(404).json({ msg: "Address not found" });
        }

        user.addresses.forEach(addr => {
            addr.isPrimary = addr._id.toString() === addressId;
        });

        await user.save();
        return res.status(200).json({ msg: "Primary address updated", addresses: user.addresses });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const removeAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { addresses: { _id: addressId } } },
            { new: true }
        );

        if (!user) return res.status(404).json({ msg: "User not found" });

        return res.status(200).json({ msg: "Address removed", addresses: user.addresses });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
