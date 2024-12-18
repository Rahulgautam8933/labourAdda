import express from "express"
import cors from "cors"
import cookiesParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: false
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookiesParser());


import LabourRouter from "./routes/labourRoutes.js";
import CustomerRouter from "./routes/customerRoutes.js";
import CategoryRouter from "./routes/categoryRoutes.js";
import SubCategoryRouter from "./routes/subCategoryRoutes.js";
import ContactRouter from "./routes/contactRoutes.js";
import CareerRouter from "./routes/careerRoutes.js";
app.use("/api/v1/Category", CategoryRouter);
app.use("/api/v1/SubCategory", SubCategoryRouter);
app.use("/api/v1/labour", LabourRouter);
app.use("/api/v1/customer", CustomerRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/career", CareerRouter);



export { app }