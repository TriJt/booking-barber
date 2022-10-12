import express from "express";
const router = express.Router();
import {
    CreateStore,
    UpdateStore,
    GetStores
} from "../app/controllers/Store.controller.js"

// create store
router.post("/create", CreateStore);

// update information of store
router.put("/update/:Name_Store", UpdateStore);

// get store 
router.get("/", GetStores);


export default router;