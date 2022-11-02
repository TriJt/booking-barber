import { Category, Service } from "../models/Service/Service.model.js";

export const CreateCategory = async (req, res) => {
  const responseType = {};
  const input = req.body;
  try {
    const newCategory = new Category({
      Title: input.Title,
    });
    const save = await newCategory.save();
    responseType.message = "Create successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.message = "Create failed";
    responseType.status = 500;
  }
  res.json(responseType);
};
// update category
export const UpdateCategory = async (req, res) => {
  const responseType = {};

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    const save = await category.save();
    responseType.message = "Create successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (err) {
    responseType.message = "Create failed";
    responseType.status = 500;
  }
  res.json(responseType);
};
//delete category and delete all service in category
export const DeleteCategory = async (req, res) => {
  const responseType = {};
  const service = req.body.Category;
  try {
    try {
      const services = await Service.deleteMany(service);
    } catch (error) {
      responseType.statusText = "Failed";
      responseType.message = "Delete service Failed";
      responseType.status = 500;
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    responseType.statusText = "Success";
    responseType.message = "Delete Successfully";
    responseType.status = 200;
  } catch (err) {
    responseType.statusText = "Failed";
    responseType.message = "Delete Failed";
    responseType.status = 500;
  }
  res.json(responseType);
};
// get all
export const GetAllCategory = async (req, res) => {
  const responseType = {};
  if (Category) {
    const category = await Category.find();
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = category;
  } else {
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

//export const all category title
export const GetTitleCategory = async (req, res) => {
  const responseType = {};
  if (Category) {
    const category = await Category.find();
    const length = category.length;
    let totalPrice = [];
    for (let i = 0; i < length; i++) {
      const price = category[i].Title;
      totalPrice.push(price);
    }
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = totalPrice;
  } else {
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get by id
export const GetCategoryByQuery = async (req, res) => {
  const responseType = {};
  const CategoryId = req.query.CategoryId;
  const Title = req.query.Title;
  if (Category) {
    const category = (await CategoryId)
      ? await Category.findById(CategoryId)
      : await Category.findOne({
          Title: Title,
        });
    responseType.statusText = "Success";
    responseType.message = "Get category successfully";
    responseType.status = 200;
    responseType.value = category;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};
