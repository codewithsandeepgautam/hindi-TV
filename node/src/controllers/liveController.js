const liveModel =require('../models/liveModel')
const getLiveNews = async (req, res) => {
  try {
      const liveUrls = await liveModel.find().sort({ createdAt: -1 });
      res.status(200).json({ liveUrls }); 
  } catch (error) {
      console.log('error>>', error);
      res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports= {getLiveNews}