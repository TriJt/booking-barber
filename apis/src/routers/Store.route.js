import express from "express";
const router = express.Router();
import {
  CreateStore,
  UpdateStore,
  GetStores,
  CreateBanner,
  getBanner,
  DeleteBanner,
} from "../app/controllers/Store.controller.js";

// create store
router.post("/add", CreateStore);

// update information of store
router.put("/update/:Name_Store", UpdateStore);

// get store
router.get("/get", GetStores);

// create new banner
router.post("/banner", CreateBanner);

// delete banner
router.delete("/delete-banner/:bannerId", DeleteBanner);

// create new banner
router.get("/get-banner", getBanner);

export default router;
