import express from "express";
const router = express.Router();
import {
  CreateService,
  UpdateService,
  DeleteService,
  GetServiceById,
  GetServices,
  GetServicesByCategoryName,
  GetServicesLimit,
  GetServicesByName,
  GetRandomServices,
  GetServicesLimit4,
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

//get limit 3
router.get("/limit", GetServicesLimit);

//get limit 4
router.get("/limit4", GetServicesLimit4);

// get service by name
router.post("/name", GetServicesByName);

// get random 5 services
router.get("/random", GetRandomServices);

export default router;
