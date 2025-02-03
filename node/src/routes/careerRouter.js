const express = require("express")
const { imageUploadMiddleware } = require("../middleware/pdfMulter")
const { careerController } = require("../controllers/careerController")
const router= express.Router()
router.post('/' , imageUploadMiddleware('file'), careerController)
module.exports = router;
