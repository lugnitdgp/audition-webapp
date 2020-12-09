const Image = require("../models/Image");
const getImages = async (req, res) => {
    try {
        let images = await Image.find({}, " -__v");
        return res.status(200).json({ images, msg: "image info fetched" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some error occured" });
    }
};
const uploadImage = async (req, res) => {
    console.log('hi')
    try {
        if (req.file && req.file.path) {
            const image = new Image({
                description: req.body.desc,
                url: req.file.path,
            });
            await image.save();
            return res.status(200).json({ msg: "image successfully saved" });
        } else {
            console.log(req.file);
            return res.status(422).json({ error: "invalid" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some error occured" });
    }
};
module.exports = {
    getImages,
    uploadImage,
};