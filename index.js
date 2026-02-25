const express = require('express');
const app = express();
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.get("/", (req, res) => {
  res.json(res.body);
});

app.post("/api/upload", upload.single('file'), (req, res) => {
  res.json(req.file);
});

app.listen(port, () => {
  console.log("Listening on port", port);
});