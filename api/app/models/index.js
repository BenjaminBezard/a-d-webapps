const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const db = {};

mongoose.Promise = global.Promise;
db.mongoose = mongoose
db.user = require("./user.model");
db.role = require("./role.model");
db.file = require("./file.model");
db.ROLES = ["user", "admin"];
db.url = dbConfig.url;

module.exports = db;
