const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/test/all", userController.allAccess);

    app.get("/test/user", [authJwt.verifyToken], userController.userBoard);

    app.get(
        "/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.adminBoard
    );

    app.get("/admin/users", [authJwt.verifyToken, authJwt.isAdmin], userController.getAllUsers);

    // app.post("/admin/changerole", [authJwt.verifyToken, authJwt.isAdmin], userController.changeUserRole);

    app.post("/admin/deleteuser", [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);
};