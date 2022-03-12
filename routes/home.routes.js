const router = require("express").Router();
const path = require("path");
const Home = require("../controllers/home.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("file");

router.get("/", Home.getHomePage);
router.post("/import", upload, Home.importData);
router.post("/delete", Home.deleteUser);
router.post("/filter", Home.filterUser);
router.post("/edit", Home.editData);

module.exports = router;
