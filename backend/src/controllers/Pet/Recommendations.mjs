import Product from "../../models/product.mjs";
import Pet from "../../models/pet.mjs";

export const getPetRecommendations = async (req, res) => {
    try {
        const { petId } = req.params;
        const pet = await Pet.findById(petId);
        
        let strictQuery = {
            petType: pet.type.toLowerCase(),
            ageGroup: { $in: [getAgeGroup(pet.age), "all"] }
        };

        let recommendedProducts = await Product.find({
            ...strictQuery,
            size: { $in: [pet.size.toLowerCase(), "all"] },
            isGrainFree: pet.needs.includes("Grain-free")
        }).limit(10);

        if (recommendedProducts.length === 0) {
            recommendedProducts = await Product.find(strictQuery).limit(10);
        }

        return res.status(200).json({
            status: "success",
            message: recommendedProducts.length > 0 
                ? `Personalized for ${pet.name}` 
                : "General recommendations",
            data: recommendedProducts
        });

    } catch (error) {
        return res.status(500).json({ msg: "Error", error: error.message });
    }
};
const getAgeGroup = (age) => {
    if (age <= 1) return "puppy";
    if (age >= 8) return "senior";
    return "adult";
};