import { Router } from "express";
import {
    getCountry,
    getStateByCountryId,
    uploadImage,
    getCityByStateId,
    addData,
    getAllData,
    getDataById,
    updateData,
    deleteData
} from "../controllers/labourController.js";
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
routes.post("/addData", addData);
routes.get("/getAllData", getAllData);
routes.get("/getCountry", getCountry);
routes.get("/getDataById/:id", getDataById);
routes.delete("/deleteData/:id", deleteData);
routes.patch("/updateData/:id", updateData);
routes.get("/getState/:CountryId", getStateByCountryId);
routes.get("/getcity/:StateId", getCityByStateId);

export default routes;
