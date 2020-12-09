const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "app",
        allowedFormats: ["jpg", "png", "jpeg", "ogg", "mp3", "wav"],
        resource_type: "auto"
    }

    //  transformation: [{ width: 500, height: 500, crop: "limit" }],
});
const upload = multer({ storage: storage });
module.exports = upload;