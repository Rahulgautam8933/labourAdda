import { Router } from "express";
import {

    addData,
    getAllData,
    getDataById,
    updateData,
    deleteData
} from "../controllers/customerController.js";


const routes = Router();


routes.post("/addData", addData);
routes.get("/getAllData", getAllData);
routes.get("/getDataById/:id", getDataById);
routes.delete("/deleteData/:id", deleteData);
routes.patch("/updateData/:id", updateData);

export default routes;
