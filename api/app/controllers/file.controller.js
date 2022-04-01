//const config = require("../config/auth.config");
const multer = require("multer");
const db = require("../models");
const File = db.file;

const storage = multer.diskStorage({
    destination: "./public/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("myfile");

exports.uploadFile = (req, res) => {
    upload(req, res, () => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        const file = new File();
        file.meta_data = req.file;
        file.save().then(() => {
            res.status(200).send({ message: "uploaded successfully" })
        })
        /*Now do where ever you want to do*/
    });
};

exports.getAllFile = (req, res) => {
    res.status(200).send({ message: "Get all file" });
}