const cloudinary = require('cloudinary').v2;
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const folderPath = './pics';

const watcher = chokidar.watch(folderPath, {
  ignored: /^\./, // Ignore hidden files
  persistent: true
});

// Handle file addition events
watcher.on('add', (filePath) => {
  // Upload the newly added file to Cloudinary
  cloudinary.uploader.upload(filePath, (error, result) => {
    if (error) {
      console.error('Error uploading file:', error);
    } else {
      console.log(`Uploaded ${filePath} to Cloudinary. Public URL: ${result.secure_url}`);
    }
  });
});

// Handle errors
watcher.on('error', (error) => {
  console.error('Error watching folder:', error);
});

console.log(`Watching folder for new photos: ${folderPath}`);
