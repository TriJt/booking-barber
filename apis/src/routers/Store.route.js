import express from "express";
const router = express.Router();
import {
  CreateStore,
  UpdateStore,
  GetStores,
  CreateBanner,
  getBanner,
  DeleteBanner,
  UpdateBanner,
  GetById,
  GetBannerWithId,
} from "../app/controllers/Store.controller.js";

// create store
router.post("/add", CreateStore);

// update information of store
router.put("/update", UpdateStore);

// get store
router.get("/get", GetStores);

// get by id
router.get("/getById", GetById);

// create new banner
router.post("/banner", CreateBanner);

router.put("/update-banner/:id", UpdateBanner);

// delete banner
router.delete("/delete-banner/:bannerId", DeleteBanner);

// get all banner
router.get("/get-banner", getBanner);

// get banner with id
router.get("/banner/:id", GetBannerWithId);

export default router;
