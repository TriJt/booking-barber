import express from "express";
const router = express.Router();
import {
  CreateService,
  UpdateService,
  DeleteService,
  GetServiceById,
  GetServices,
  GetServicesByCategoryName,
} from "../app/controllers/Service.controller.js";

// create Service
router.post("/add", CreateService);

// update information of Service
router.put("/update/:id", UpdateService);

// delete Service
router.delete("/delete/:id", DeleteService);

// get all Service by id
router.get("/all", GetServices);

// get service by name category
router.get("/category/", GetServicesByCategoryName);

// get Service by id
router.get("/", GetServiceById);

export default router;
