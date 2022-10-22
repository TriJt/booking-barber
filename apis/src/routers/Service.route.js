import express from "express";
const router = express.Router();
import {
  CreateService,
  UpdateService,
  DeleteService,
  GetServiceById,
  GetServices,
} from "../app/controllers/Service.controller.js";

// create Service
router.post("/add", CreateService);

// update information of Service
router.put("/update/:id", UpdateService);

// delete Service
router.delete("/delete/:id", DeleteService);

// get Service by id
router.get("/:id", GetServiceById);

// get all Service by id
router.get("/all", GetServices);

export default router;
