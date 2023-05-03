const express = require("express");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const upload = multer({ dest: "uploads/temp" });

const app = express();

const port = 5000;

app.post("/profile", upload.single("avatar"), (req, res, next) => {
  const nameChunks = req.file.originalname.split(" ");
  const fileExt = nameChunks[nameChunks.length - 1];
  sharp(req.file.path)
    .toFile(path.join(__dirname, "uploads", `${req.file.filename}.${fileExt}`))
    .catch(console.error);
  res.json(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.post(
  "/photos/upload",
  upload.array("photos", 6),
  function (req, res, next) {
    const nameChunks = req.files.originalname.split(".");
  const fileExt = nameChunks[nameChunks.length - 1];
  sharp(req.files.path)
    .toFile(path.join(__dirname, "uploads", `${req.files.filename}.${fileExt}`))
    .catch(console.error);
  res.json(req.files);
    // req.files is array of `photos` files
    console.log(req.files);
    // req.body will contain the text fields, if there were any
  }
);

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);
app.post("/cool-profile", cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});

app.listen(port, () => {
  console.log(`app now runing on port ${port}`);
});
