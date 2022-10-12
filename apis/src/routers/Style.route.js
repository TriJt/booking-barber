import express from "express";
const router = express.Router();
import {
    UpdateStyles,
    DeleteStyles,
    GetStylesById,
    GetStyles
} from "../app/controllers/Style.controller.js"


// update information of Styles
router.put("/update", UpdateStyles);

// delete Styles 
router.delete("/delete", DeleteStyles);

// get Styles by id 
router.get("/:StylesId", GetStylesById);

// get all Styles by id 
router.get("/", GetStyles)
export default router;