const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find({}).filter(function( user ) {
            return user.username !== 'admin';
        });
        res.status(200).send({
            data: users,
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: err,
            success: false
        });
    }
};

exports.changeUserRole = (req, res) => {
    return
};

exports.deleteUser = async (req, res) => {
    if (!req.body.username || req.body.username === "admin") {
        res.status(401).json({
            message: "Wrong username!",
            success: false
        });
        return res;
    }
    await User.remove({ username: req.body.username });
    res.status(200).json({
        message: "User deleted",
        success: true
    });
};