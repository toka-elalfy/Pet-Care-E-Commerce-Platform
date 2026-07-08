import pet from "../../models/pet.mjs"

export const getAllPets = async (req,res) => {
    try {
        const pets = await pet.find({owner : req.user.id});
        if(pets.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).send(pets);
    }catch(error) {
        return res.status(500).json({"msg" : "Internal Server Error"});
    }

}