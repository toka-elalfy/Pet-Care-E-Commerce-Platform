import Product from "../../models/product.mjs";

export const getSingleProduct = async(req,res) => {
    try {
        const {slug} = req.params;
        const targetProduct = await Product.find({slug});
        if(!targetProduct) {
            return res.status(404).json({msg : "product not found"});
        }
        return res.status(200).json({status : "success" , targetProduct});
    }catch(error) {
        return res.status(500).send({status : "error" , error : error.message});
    }
}