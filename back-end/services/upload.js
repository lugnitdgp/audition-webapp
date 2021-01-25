const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require('dotenv').config()
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET  
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "app",
        allowedFormats: ["jpg", "png", "jpeg", "ogg", "mp3", "wav", "txt", "zip", "cpp"],
        resource_type: "auto"
    }

    //  transformation: [{ width: 500, height: 500, crop: "limit" }],
});
const upload = multer({ storage: storage });
module.exports = upload;