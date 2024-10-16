import { Router } from "express";
import { getCountry, getStateByCountryId, uploadImage, getCityByStateId } from "../controllers/labourController.js";
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

routes.post("/uploadImage", upload.single('image'), uploadImage);
routes.get("/getCountry", getCountry);
routes.get("/getState/:CountryId", getStateByCountryId);
routes.get("/getcity/:StateId", getCityByStateId);

export default routes;
