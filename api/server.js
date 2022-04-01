require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
        initial();
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}

// app.get("/", (req, res) => { res.json({ message: "Hello world!" }); });

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/file.routes')(app);

app.use(express.static(path.resolve(__dirname, "../front/build")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../front/build", "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});