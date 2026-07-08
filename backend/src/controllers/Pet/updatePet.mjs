import mongoose from "mongoose";
import pet from "../../models/pet.mjs";

export const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ "msg": "Invalid ID format" })
        }
        if (Object.keys(req.body).length === 0 && !req.file) {
            return res.status(204).json({ "msg": "No Provided Data to update" });
        }
        if (req.file) {
            req.body.photo = `/uploads/${req.file.filename}`;
        }
        const updatedPet = await pet.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedPet) {
            return res.status(404).json({ "msg": "Pet Not Found" });
        }
        return res.status(200).send({
            "msg": "Pet Updated Successfully",
            "pet": updatedPet
        });
    } catch (err) {
        return res.status(501).json({ "msg": "Internal Server Error" });
    }
}