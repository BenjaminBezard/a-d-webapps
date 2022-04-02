const controller = require("../controllers/file.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.get("/file/all", [authJwt.verifyToken, upload.single("myFile")], controller.getAllFile);
    app.get("/file/all", /*[authJwt.verifyToken],*/ controller.getAllFile);

    app.get("file/search", [authJwt.verifyToken], controller.getSearchFile);

    app.post("/file/upload", /*[authJwt.verifyToken/*, upload.single("myImage")],*/ controller.uploadFile);
};