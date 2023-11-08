const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: 'drml6krlk', 
  api_key: '671681864626548', 
  api_secret: 'AHFqq9-xBhoZ3esxQBQIxfypoNM' 
});

module.exports = cloudinary;