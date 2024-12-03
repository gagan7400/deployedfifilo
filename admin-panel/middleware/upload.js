const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "pdf" || file.mimetype == "application/pdf") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    },
    limits: { fileSize: 1024 * 1024 * 10 }
})
module.exports = { upload };