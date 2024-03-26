import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "express-blog-api", // Optional, set a specific folder in Cloudinary
    format: async () => "png", // Example: always convert uploaded images to PNG format
  },
});

// File filter function to allow only JPEG, JPG, and PNG
// eslint-disable-next-line consistent-return
const fileFilter = (allowedFileTypes) => (req, file, cb) => {
  const extname = allowedFileTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage,
  fileFilter: fileFilter(/jpeg|jpg|png/),
  limits: {
    fileSize: 1024 * 1024 * process.env.IMAGE_SIZE, // 1MB limit (adjust as needed)
  },
});

const deleteImage = async (imageUrl) => {
  const urlArray = imageUrl.split("express-blog-api/");
  const url = urlArray[urlArray.length - 1].split(".png", 1)[0];
  const publicId = `express-blog-api/${url}`;

  await cloudinary.api.delete_resources([publicId], {
    type: "upload",
    resource_type: "image",
  });
};

// eslint-disable-next-line import/prefer-default-export
export { upload, deleteImage };
