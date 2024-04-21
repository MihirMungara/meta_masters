import express from 'express';
import { urlencoded, json } from 'body-parser';
import { writeFileSync } from 'fs';
import { join } from 'path';

const app = express();

// Middleware
app.use(urlencoded({ extended: false }));
app.use(json());

// POST route to handle file data
app.post('/upload', (req, res) => {
  const fileData = req.body.fileData;

  // Write fileData to a JSON file
  const filePath = join(__dirname, 'sample.json');
  writeFileSync(filePath, fileData);

  res.send('File data saved successfully');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
