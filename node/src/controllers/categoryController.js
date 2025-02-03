const categoryModel = require('../models/categoryModel')
const showCategory = async (req, res) => {
    const lang = req.params.lang.toLowerCase();
    try {
        const categories = await categoryModel.find({ isDeleted: false });

        // Map categories based on the language specified
        const mappedCategories = categories.map(category => {
            let categoryObj = {
                _id: category._id, // Include the category ID

            };
            if (lang === 'en') {
                categoryObj.category = category.category; // Return the English category
            } else if (lang === 'pu') {
                categoryObj.category = category.categoryHn; // Return the Punjabi category
            } else {
                categoryObj.error = 'Invalid language selection'; // Handle invalid language selection
            }
            return categoryObj;
        });

        res.status(200).json({ categories: mappedCategories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {showCategory}