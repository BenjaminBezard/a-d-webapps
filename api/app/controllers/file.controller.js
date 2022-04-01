//const config = require("../config/auth.config");
const multer = require("multer");
const db = require("../models");
const path = require("path");
const User = db.user;
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
    try {
        upload(req, res, () => {
            console.log("Request ---", req.body);
            // console.log("Request file ---", req.file);//Here you get file.
            const file = new File();
            // file.name = req.file.name;
            file.meta_data = req.file;
            file.save().then(() => {
                res.status(200).send({
                    message: "uploaded successfully",
                    success: true
                })
            })
            /*Now do where ever you want to do*/
        });
    } catch (err) {
        console.log("UPLOAD ERR:", err);
        res.status(500).send({
            message: "uploaded wrongfully",
            success: false
        });
    }
};

// exports.uploadFile = (req, res) => {
//     try {
//         console.log("Request ---", req);
//         console.log("Request file ---", req.file);//Here you get file.
//         const file = new File();
//         // file.name = req.file.name;
//         file.meta_data = req.file;
//         file.save().then(() => {
//             res.status(200).send({
//                 message: "uploaded successfully",
//                 success: true
//             })
//         })
//         /*Now do where ever you want to do*/
//     } catch (err) {
//         console.log("UPLOAD ERR:", err);
//         res.status(500).send({
//             message: "uploaded wrongfully",
//             success: false
//         });
//     }
// };

exports.getAllFile = async (req, res) => {
    try {
        console.log("get all file");
        let user = await User.findById(req.userId).exec();
        let dbFiles = await File.find({ _id: { $in: user.files } });
        res.status(200).send({
            data: dbFiles,
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error with getAllFile",
            success: false
        });
    }
};

exports.getSearchFile = async (req, res) => {
    try {
        if (!req.search || req.search == '')
            return await this.getAllFile(req, res);
        let files = [];
        let user = await User.findById(req.userId).exec();
        let dbFiles = await File.find({ _id: { $in: user.files } });
        for (let file of dbFiles) {
            if (file.name.match(req.search)) {
                files.append(file);
            }
        }
        res.status(200).send({
            data: files,
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error with getSearchFile",
            success: false
        });
    }
};
