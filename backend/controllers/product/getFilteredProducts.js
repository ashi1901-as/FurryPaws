// getFilteredProducts.js

import productModel from "../../models/productModel.js";

const getFilteredProducts = async (req, res) => {
    try {
        const { category, priceRange, ratings } = req.query;
        const filters = {};

        if (category) {
            filters.category = { $regex: new RegExp(category, 'i') };
        }

        if (priceRange && priceRange.length === 2) {
            const [minPrice, maxPrice] = priceRange;
            const min = Number(minPrice);
            const max = Number(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filters.price = { $gte: min, $lte: max };
            }
        }

        if (ratings) {
            const minRatings = Number(ratings);
            if (!isNaN(minRatings)) {
                filters.ratings = { $gte: minRatings };
            }
        }

        const products = await productModel.find(filters).sort({ createdAt: -1 });

        // --- THE CRITICAL FIX IS HERE ---
        // Change the status code to 200 and send an empty array
        if (!products || products.length === 0) {
            return res.status(200).send({
                success: true, // Indicate success, but with no results
                message: "No Products Found!",
                products: [], // Send an empty array
            });
        }
        
        res.status(200).send({ success: true, products });
        
    } catch (error) {
        console.error("Filter Products Error: ", error);
        res.status(500).send({
            success: false,
            message: "Error in getting Filtered Products",
            error: error.message,
        });
    }
};

export default getFilteredProducts;