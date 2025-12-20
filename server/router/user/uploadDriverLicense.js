const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/userLicense"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.floor(Math.random() * 1000);
    cb(null, unique + path.extname(file.originalname));
  },
});

exports.upload = multer({ storage });
