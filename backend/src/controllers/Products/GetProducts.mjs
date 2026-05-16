import Product from "../../models/product.mjs";
export const getProducts = async (req, res) => {
    try {
        let finalQuery = {};


        // Search
        if (req.query.keyword) {
            finalQuery.title = { $regex: req.query.keyword, $options: 'i' };
        }

        Object.keys(req.query).forEach((key) => {
            const excludedFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
            
            if (!excludedFields.includes(key)) {
                const val = req.query[key];

                if (val === 'all') return; 

                if (key.includes('[') && key.includes(']')) {
                    const parts = key.split(/[\[\]]/).filter(Boolean);
                    const field = parts[0];
                    const operator = `$${parts[1]}`;

                    if (!finalQuery[field]) finalQuery[field] = {};
                    finalQuery[field][operator] = isNaN(val) ? val : Number(val);
                } else {
                    finalQuery[key] = isNaN(val) ? val : Number(val);
                }
            }
        });

        // (Sort & Pagination)
        const sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : '-createdAt';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

       
        const products = await Product.find(finalQuery)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(req.query.fields ? req.query.fields.split(',').join(' ') : '-__v');

        const totalProducts = await Product.countDocuments(finalQuery);

        return res.status(200).json({
            status: 'success',
            total: totalProducts,
            data: products
        });

    } catch (error) {
        return res.status(500).json({ status: 'error', msg: error.message });
    }
}