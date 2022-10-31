import { Category, Service } from "../models/Service/Service.model.js";

// create information of Service
//COMPLETE
export const CreateService = async (req, res) => {
  const responseType = {};
  const input = req.body;
  //create new user
  try {
    const newService = new Service({
      Name_Service: input.Name_Service,
      Price: input.Price,
      Description: input.Description,
      Image: input.Image,
      Category: input.Category,
    });
    //save Customer in database and return response
    const save = await newService.save();
    try {
      await Category.findOneAndUpdate(input.Category, {
        $push: { Services: save._id },
      });
    } catch (error) {
      responseType.status = 404;
      responseType.message = "Push service in category i failed";
    }
    responseType.message = "Create new service successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch {
    responseType.status = 404;
    responseType.message = "Create service failed";
  }
  res.json(responseType);
};
// update information of Service
export const UpdateService = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    const save = await service.save();
    responseType.statusText = "Success";
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// delete information of Service
export const DeleteService = async (req, res) => {
  const responseType = {};
  const categoryName = req.body.Category;
  try {
    await Service.findByIdAndDelete(req.params.id);
    try {
      await Category.findOneAndUpdate(categoryName, {
        $pull: { Services: req.params.id },
      });
      responseType.statusText = "Success";
      responseType.message = "Delete Successfully";
      responseType.status = 200;
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    responseType.statusText = "Failed";
    responseType.message = "Delete Failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

// get information of Service by id
export const GetServiceById = async (req, res) => {
  const responseType = {};
  const ServiceId = req.query.ServiceId;
  const Name_Service = req.query.Name_Service;
  if (Service) {
    const service = (await ServiceId)
      ? await Service.findById(ServiceId)
      : await Service.findOne({
          Name_Service: Name_Service,
        });
    responseType.statusText = "Success";
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = service;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get all information of Service
export const GetServices = async (req, res) => {
  const responseType = {};
  try {
    const service = await Service.find();
    responseType.statusText = "Success";
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = service;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get service with category name
export const GetServicesByCategoryName = async (req, res) => {
  const responseType = {};
  const NameCategory = req.query.Category;
  try {
    const service = await Service.find({
      Category: NameCategory,
    });
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = service;
  } catch (error) {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};
