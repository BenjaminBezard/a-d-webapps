var mongoose = require('mongoose');

// const fileSchema = new mongoose.Schema({
//     meta_data: {}
// });

const fileSchema = new mongoose.Schema({
    name: String,
    desc: String,
    file: {
        data: Buffer,
        contentType: String
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;