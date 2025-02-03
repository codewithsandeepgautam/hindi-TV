// // newsController.js
// const News = require('../models/newsModel');

// const getNewsByLanguage = async (req, res) => {
//     const lang = req.params.lang.toLowerCase();

//     try {
//         // Fetch the latest item based on the createdAt field in descending order
//         const newsItems = await News.find().sort({ createdAt: -1 });
        
//         if (!newsItems || newsItems.length === 0) {
//             return res.status(404).json({ error: 'No news items found' });
//         }

//         const response = newsItems.map(news => {
//             const createdAtDate = new Date(news.createdAt).toISOString().split('T')[0];
//             return {
//                 'en': {
//                     title: news.title,
//                     description: news.description,
//                     img: news.img,
//                     videoUrl: news.videoUrl,
//                     createdAt: createdAtDate
//                 },
//                 'pu': {
//                     title: news.titleHn || "No title in Punjabi available",
//                     description: news.descriptionHn || "No description in Punjabi available",
//                     img: news.img,
//                     videoUrl: news.videoUrl,
//                     createdAt: createdAtDate
//                 },
//                 'default': {
//                     error: 'Invalid language selection'
//                 }
//             }[lang] || { error: 'Invalid language selection' };
//         });
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
// module.exports ={getNewsByLanguage}
const mongoose = require('mongoose')
const News = require('../models/newsModel');
const Category = require('../models/categoryModel'); // Import your Category model

const getNewsByLanguage = async (req, res) => {
    const lang = req.params.lang.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;

    try {
        // Pagination logic

        // Use aggregation to join with categories based on categoryId
        const newsItems = await News.aggregate([
            {
                $match: {isActive: true}
            },
            {
                $sort: { createdAt: -1 } // Sorting by createdAt in descending order
            },
            {
                $lookup: {
                    from: 'categories', // Assuming your categories collection name is 'categories'
                    localField: 'categoryId', // Field in the News collection
                    foreignField: '_id', // Field in the Category collection
                    as: 'categoryData'
                }
            },
            {
                $addFields: {
                    category: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                           {$arrayElemAt:['$categoryData.category',0]} , // English category
                           {$arrayElemAt:['$categoryData.categoryHn',0]} , // Punjabi category
                            
                        ]
                    }
                }
            },
            {
                $project: {
                    title: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                            '$title',
                            '$titleHn'
                        ]
                    },
                    description: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                            '$description',
                            '$descriptionHn'
                        ]
                    },
                    img: 1,
                    videoUrl: 1,
                    handle: 1,
                    createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    category: 1,
                    author: 1,
                   
                }
            },
            {
                $skip: (page - 1) * pageSize // Skip documents based on current page
            },
            {
                $limit: pageSize // Limit the number of docs
            }
        ]);

        if (!newsItems || newsItems.length === 0) {
            return res.status(404).json({ error: 'No news items found' });
        }

        res.json(newsItems);
    } catch (error) {
        console.error('Error fetching news by language:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getNewsById = async(req, res)=>{
    const lang = req.params.lang.toLowerCase() 
    // const articleId = req.params.id 
    const handle = req.params.handle
try {
    const [currentNewsItem] = await News.aggregate([
        {
            $match: {
                // _id: new mongoose.Types.ObjectId(articleId) // Convert ID string to MongoDB ObjectId
                handle : handle,
                isActive : true
            }
        },
        {
            $lookup: {
                from: 'categories', // Assuming your categories collection name is 'categories'
                localField: 'categoryId',
                foreignField: '_id',
                as: 'categoryData'
            }
        },
        {
            $lookup: {
                from: 'authors', // Assuming your authors collection name is 'authors'
                localField: 'authorId', // Field in the News collection
                foreignField: '_id', // Field in the Author collection
                as: 'authorData'
            }
        },
        {
            $addFields: {
                category: {
                    $cond: [
                        { $eq: [lang, 'en'] },
                       {$arrayElemAt:['$categoryData.category',0]} , // English category
                       {$arrayElemAt:['$categoryData.categoryHn',0]} , // Punjabi category
                        
                    ]
                },
                author: {
                    $cond: [
                        { $eq: [lang, 'en'] },
                        { $arrayElemAt: ['$authorData.name', 0] }, // English author name
                        { $arrayElemAt: ['$authorData.nameHn', 0] } // Punjabi author name
                    ]
                },
                about: {
                    $cond: [
                        { $eq: [lang, 'en'] },
                        { $arrayElemAt: ['$authorData.about', 0] }, // English author about
                        { $arrayElemAt: ['$authorData.aboutHn', 0] } // Punjabi author about
                    ]
                },
                authorImg: {
                    $arrayElemAt: ['$authorData.profileImage', 0] // Author image URL
                },
                socialLink: {
                    $arrayElemAt: ['$authorData.socialLink', 0] // Author social link
                }
            }
        },
        {
            $project: {
                title: {
                    $cond: [
                        { $eq: [lang, 'en'] },
                        '$title',
                        '$titleHn'
                    ]
                },
                description: {
                    $cond: [
                        { $eq: [lang, 'en'] },
                        '$description',
                        '$descriptionHn'
                    ]
                },
                img: 1,
                videoUrl: 1,
                createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                category: 1,
                author:1,
                about: 1,
                socialLink: 1,
                authorImg:1,
                handle:1
            }
        }
    ]);

    // if (!newsItem || newsItem.length === 0) {
    //     return res.status(404).json({ error: 'News item not found' });
    // }
    // console.log('Current news item:', currentNewsItem);
    if (!currentNewsItem) {
        return res.status(404).json({ error: 'News item not found' });
    }

    const currentId = currentNewsItem._id; // Return the first item (assuming the ID is unique)
    console.log(">>>",currentId)
    const previousNewsItem = await News.findOne({
        _id: { $lt: new mongoose.Types.ObjectId(currentId) }, // Find articles with IDs less than the current ID
       isActive:true
        // Add any other criteria if necessary (e.g., language, category, etc.)
    })
    .sort({ _id: -1 }) // Sort in descending order to get the nearest previous item
    console.log(">>",previousNewsItem)
    

    const nextNewsItem = await News.findOne({
        _id: { $gt: new mongoose.Types.ObjectId(currentId) }, // Find articles with IDs greater than the current ID
        isActive:true
        // Add any other criteria if necessary (e.g., language, category, etc.)
    })
    .sort({ _id: 1 })
    
    ;
    console.log(">>>", nextNewsItem)
    // // Construct the response object
    const response = {
        current: currentNewsItem,
        previousId: previousNewsItem ? (previousNewsItem.handle ? previousNewsItem.handle : null) : null,
        nextId: nextNewsItem ? (nextNewsItem.handle ? nextNewsItem.handle : null) : null
    };
    
    
    res.json(response);
} catch (error) {
    console.error('Error fetching news by ID and language:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}


// get news by category 
// const getNewsByCategoryId = async (req, res) => { 
//     const { lang, categoryId } = req.params; // Destructure language and categoryId from request parameters
//     const page = parseInt(req.query.page)|| 1;
//     const pageSize = 8;
//     try {
//         // Use aggregation to filter by categoryId and join with categories
//         const newsItems = await News.aggregate([
//             {
//                 $match: { categoryId: new mongoose.Types.ObjectId(categoryId) } // Convert categoryId string to ObjectId
//             },
//             {
//                 $sort: { createdAt: -1 } // Sorting by createdAt in descending order
//             },
//             {
//                 $lookup: {
//                     from: 'categories', // Assuming your categories collection name is 'categories'
//                     localField: 'categoryId', // Field in the News collection
//                     foreignField: '_id', // Field in the Category collection
//                     as: 'categoryData'
//                 }
//             },
//             {
//                 $addFields: {
//                     category: {
//                         $cond: [
//                             { $eq: [lang, 'en'] },
//                             { $arrayElemAt: ['$categoryData.category', 0] }, // English category
//                             { $arrayElemAt: ['$categoryData.categoryHn', 0] } // Punjabi category
//                         ]
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     title: {
//                         $cond: [
//                             { $eq: [lang, 'en'] },
//                             '$title',
//                             '$titleHn'
//                         ]
//                     },
//                     description: {
//                         $cond: [
//                             { $eq: [lang, 'en'] },
//                             '$description',
//                             '$descriptionHn'
//                         ]
//                     },
//                     img: 1,
//                     videoUrl: 1,
//                     createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                     category: 1
//                 }
//             },
//             {
//                 $skip:(page-1) * pageSize //Skip documents based on current page 
//             },{
//                 $limit: pageSize //Limit the number of docs
//             }
//         ]);

//         if (!newsItems || newsItems.length === 0) {
//             return res.status(404).json({ error: 'No news items found for the specified category and language' });
//         }

//         res.json(newsItems);
//     } catch (error) {
//         console.error('Error fetching news by category and language:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// get news and categories

// const getAllCategoriesWithNews = async (req, res) => {
//     const { lang } = req.params; // Destructure language from request parameters
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = 8;
//     try {
//         // Aggregate to retrieve all categories with their respective news items
//         const categoriesWithNews = await Category.aggregate([
//             {
//                 $match: { isDeleted: false } // Match only categories that are not deleted
//             },
//             {
//                 $lookup: {
//                     from: 'news', // Assuming your news collection name is 'news'
//                     localField: '_id', // Field in the Category collection
//                     foreignField: 'categoryId', // Field in the News collection
//                     as: 'newsItems'
//                 }
//             },
//             {
//                 $unwind: "$newsItems" // Unwind to work with individual news items
//             },
//             {
//                 $match: { 'newsItems.isActive': true } // Filter news items by isActive: true
//             },
//             {
//                 $group: {
//                     _id: "$_id",
//                     category: { $first: "$category" }, // Group back by category
//                     newsItems: { $push: "$newsItems" }, // Push news items back into an array
//                 }
//             },
//             {
//                 $addFields: {
//                     // Include only the necessary fields based on the language
//                     category: {
//                         $cond: [
//                             { $eq: [lang, 'en'] },
//                             '$category', // English category
//                             '$categoryHn' // Punjabi category
//                         ]
//                     },
//                     newsItems: {
//                         $slice: ['$newsItems', (page - 1) * pageSize, pageSize] // Paginate news items
//                     }
//                 }
//             },
//             {
//                 $sort: { "newsItems.createdAt": -1 } // Sort news items by createdAt in descending order
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     category: 1,
//                     newsItems: {
//                         $map: {
//                             input: '$newsItems',
//                             as: 'item',
//                             in: {
//                                 _id: '$$item._id', // Include news ID
//                                 title: {
//                                     $cond: [
//                                         { $eq: [lang, 'en'] },
//                                         '$$item.title',
//                                         '$$item.titleHn'
//                                     ]
//                                 },
//                                 description: {
//                                     $cond: [
//                                         { $eq: [lang, 'en'] },
//                                         '$$item.description',
//                                         '$$item.descriptionHn'
//                                     ]
//                                 },
//                                 img: '$$item.img',
//                                 videoUrl: '$$item.videoUrl',
//                                 createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$$item.createdAt" } },
//                             }
//                         }
//                     }
//                 }
//             },
//             {
//                 $sort: { "_id": 1 } // Sort categories by _id in ascending order
//             }
//         ]);

//         if (!categoriesWithNews || categoriesWithNews.length === 0) {
//             return res.status(404).json({ error: 'No categories with news items found' });
//         }

//         res.json(categoriesWithNews);
//     } catch (error) {
//         console.error('Error fetching categories with news items:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }; 
// const getAllCategoriesWithNews = async (req, res) => {
//     const { lang } = req.params; // Destructure language from request parameters
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = 8;
//     try {
//         // Aggregate to retrieve all categories with their respective news items
//         const categoriesWithNews = await Category.aggregate([
//             {
//                 $match: { isDeleted: false } // Match only categories that are not deleted
//             },
//             {
//                 $lookup: {
//                     from: 'news', // Assuming your news collection name is 'news'
//                     localField: '_id', // Field in the Category collection
//                     foreignField: 'categoryId', // Field in the News collection
//                     as: 'newsItems'
//                 }
//             },
//             {
//                 $addFields: {
//                     // Include only the necessary fields based on the language
//                     category: {
//                         $cond: [
//                             { $eq: [lang, 'en'] },
//                             '$category', // English category
//                             '$categoryHn' // Punjabi category
//                         ]
//                     },
//                     handle:1,
//                     newsItems: {
//                         $slice: ['$newsItems', (page - 1) * pageSize, pageSize] // Paginate news items
//                     }
//                 }
//             },
//             {
//                 $unwind: "$newsItems" // Unwind to work with individual news items
//             },
//             {
//                 $match: { 'newsItems.isActive': true } // Filter news items by isActive: true
//             },
//             {
//                 $sort: { "newsItems.createdAt": -1 } // Sort news items by createdAt in descending order
//             },
//             {
//                 $group: {
//                     _id: "$_id",
//                     category: { $first: "$category" }, // Group back by category
//                     newsItems: { $push: "$newsItems" }, // Push news items back into an array
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     category: 1,
//                     handle:1,
//                     newsItems: {
//                         $map: {
//                             input: '$newsItems',
//                             as: 'item',
//                             in: {
//                                 _id: '$$item._id', // Include news ID
//                                 title: {
//                                     $cond: [
//                                         { $eq: [lang, 'en'] },
//                                         '$$item.title',
//                                         '$$item.titleHn'
//                                     ]
//                                 },
//                                 description: {
//                                     $cond: [
//                                         { $eq: [lang, 'en'] },
//                                         '$$item.description',
//                                         '$$item.descriptionHn'
//                                     ]
//                                 },
//                                 img: '$$item.img',
//                                 videoUrl: '$$item.videoUrl',
//                                 createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$$item.createdAt" } },
//                             }
//                         }
//                     }
//                 }
//             },
//             {
//                 $sort: { "_id": 1 } // Sort categories by _id in ascending order
//             }
//         ]);

//         if (!categoriesWithNews || categoriesWithNews.length === 0) {
//             return res.status(404).json({ error: 'No categories with news items found' });
//         }

//         res.json(categoriesWithNews);
//     } catch (error) {
//         console.error('Error fetching categories with news items:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const getAllCategoriesWithNews = async (req, res) => {
    const { lang } = req.params; // Destructure language from request parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    try {
        // Aggregate to retrieve all categories with their respective news items
        const categoriesWithNews = await Category.aggregate([
            {
                $match: { isDeleted: false } // Match only categories that are not deleted
            },
            {
                $lookup: {
                    from: 'news', // Assuming your news collection name is 'news'
                    localField: '_id', // Field in the Category collection
                    foreignField: 'categoryId', // Field in the News collection
                    as: 'newsItems'
                }
            },
            {
                $addFields: {
                    // Include only the necessary fields based on the language
                    category: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                            '$category', // English category
                            '$categoryHn' // Punjabi category
                        ]
                    },
                    handle: "$handle", // Include the category handle
                    newsItems: {
                        $slice: ['$newsItems', (page - 1) * pageSize, pageSize] // Paginate news items
                    }
                }
            },
            {
                $unwind: "$newsItems" // Unwind to work with individual news items
            },
            {
                $lookup: {
                    from: 'news', // Assuming your news collection name is 'news'
                    localField: 'newsItems._id', // Field in the Category collection
                    foreignField: '_id', // Field in the News collection
                    as: 'newsDetails'
                }
            },
            {
                $addFields: {
                    // Include handle from news
                    "newsItems.handle": { $arrayElemAt: ["$newsDetails.handle", 0] }
                }
            },
            {
                $match: { 'newsItems.isActive': true } // Filter news items by isActive: true
            },
            {
                $sort: { "newsItems.createdAt": -1 } // Sort news items by createdAt in descending order
            },
            {
                $group: {
                    _id: "$_id",
                    category: { $first: "$category" }, // Group back by category
                    handle: { $first: "$handle" }, // Group back by handle
                    newsItems: { $push: "$newsItems" }, // Push news items back into an array
                }
            },
            {
                $project: {
                    _id: 1,
                    category: 1,
                    handle: 1, // Include the category handle in the final result
                    newsItems: {
                        $map: {
                            input: '$newsItems',
                            as: 'item',
                            in: {
                                _id: '$$item._id', // Include news ID
                                title: {
                                    $cond: [
                                        { $eq: [lang, 'en'] },
                                        '$$item.title',
                                        '$$item.titleHn'
                                    ]
                                },
                                description: {
                                    $cond: [
                                        { $eq: [lang, 'en'] },
                                        '$$item.description',
                                        '$$item.descriptionHn'
                                    ]
                                },
                                img: '$$item.img',
                                videoUrl: '$$item.videoUrl',
                                createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$$item.createdAt" } },
                                handle: '$$item.handle' // Include handle from news
                            }
                        }
                    }
                }
            },
            {
                $sort: { "_id": 1 } // Sort categories by _id in ascending order
            }
        ]);

        if (!categoriesWithNews || categoriesWithNews.length === 0) {
            return res.status(404).json({ error: 'No categories with news items found' });
        }

        res.json(categoriesWithNews);
    } catch (error) {
        console.error('Error fetching categories with news items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getAllNewsWithCategory = async (req, res) => {
    const { lang } = req.params; // Destructure language from request parameters
    try {
        // Aggregate to retrieve all categories with their respective news items
        const categoriesWithNews = await Category.aggregate([
            {
                $match: { isDeleted: false } // Match only categories that are not deleted
            },
            {
                $lookup: {
                    from: 'news', // Assuming your news collection name is 'news'
                    localField: '_id', // Field in the Category collection
                    foreignField: 'categoryId', // Field in the News collection
                    as: 'newsItems'
                }
            },
            {
                $unwind: "$newsItems" // Unwind to work with individual news items
            },
            {
                $match: { 'newsItems.isActive': true } // Filter news items by isActive: true
            },
            {
                $addFields: {
                    // Include only the necessary fields based on the language
                    category: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                            '$categoryHn', // Punjabi category
                            '$category' // English category
                        ]
                    },
                }
            },
            {
                $sort: { "newsItems.createdAt": -1 } // Sort news items by createdAt in descending order
            },
            {
                $group: {
                    _id: "$_id",
                    category: { $first: "$category" }, // Group back by category
                    newsItems: { $push: "$newsItems" }, // Push all news items back into an array
                }
            },
            {
                $project: {
                    _id: 1,
                    category: 1,
                    newsItems: {
                        $map: {
                            input: '$newsItems',
                            as: 'item',
                            in: {
                                _id: '$$item._id', // Include news ID
                                title: {
                                    $cond: [
                                        { $eq: [lang, 'en'] },
                                        '$$item.title',
                                        '$$item.titleHn'
                                    ]
                                },
                                description: {
                                    $cond: [
                                        { $eq: [lang, 'en'] },
                                        '$$item.description',
                                        '$$item.descriptionHn'
                                    ]
                                },
                                img: '$$item.img',
                                videoUrl: '$$item.videoUrl',
                                createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$$item.createdAt" } },
                            }
                        }
                    }
                }
            },
            {
                $sort: { "_id": 1 } // Sort categories by _id in ascending order
            }
        ]);

        if (!categoriesWithNews || categoriesWithNews.length === 0) {
            return res.status(404).json({ error: 'No categories with news items found' });
        }

        res.json(categoriesWithNews);
    } catch (error) {
        console.error('Error fetching categories with news items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = { getNewsByLanguage, getNewsById, getAllCategoriesWithNews , getAllNewsWithCategory };
 