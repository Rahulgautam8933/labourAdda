import { Router } from "express";
import { addLabour, uploadImage } from "../controllers/labourController.js";
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../cloudnary/cloudinary.js";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'labor_images',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

const routes = Router();

// Define routes
routes.post("/addLabour", addLabour);
routes.post("/uploadImage", upload.single('image'), uploadImage);

export default routes;
