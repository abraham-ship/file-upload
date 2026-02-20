const express = require('express')
const app = express()
const port = 5050
const multer = require('multer')

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

//  get Endpoint
app.get('/', (req, res) => res.json());

// File Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});