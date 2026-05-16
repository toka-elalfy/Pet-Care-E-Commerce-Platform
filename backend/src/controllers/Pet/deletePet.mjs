import mongoose from "mongoose";
import pet from "../../models/pet.mjs";
export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ "msg": "Invalid ID Format" });
        }
        const deletedPet = await pet.findByIdAndDelete(id, {
            new: true
        })
        if(!deletedPet) {
            return res.status(404).json({"msg" : "Pet Not Found"});
        }
        return res.status(200).json({"msg" : "Pet Deleted Successfully", deletedPet })
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
}