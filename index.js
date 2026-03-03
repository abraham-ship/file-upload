const cloudinary = require('cloudinary').v2;
const express = require('express');
const multer = require('multer');
const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});
require('dotenv').config()
const port = process.env.PORT || 3000
const app = express();

cloudinary.config(
  {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  }
);

// upload a single image to cloudinary 
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});


app.listen(port, () => {
  console.log("Listening on port", port);
});