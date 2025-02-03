const CarrerSchema = require('../models/careerModal');
const cloudinary = require('cloudinary').v2;

const careerController = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, location, jobTitle, experience } = req.body;
        let pdfUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            pdfUrl = result.url;
        }
        const newApplication = await CarrerSchema.create({
            fullName,
            email,
            phoneNumber,
            jobTitle,
            experience,
            location,
            file: pdfUrl
        });
        return res.status(200).json({ message: "Job applied successfully", data: newApplication });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { careerController };
