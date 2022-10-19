import { Service } from "../models/Service/Service.model.js";

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
    });
    //save Customer in database and return response
    const save = await newService.save();
    responseType.statusText = "Success";
    responseType.message = "Create new staff successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch {
    responseType.statusText = "Failed";
    responseType.status = 404;
    responseType.message = "Create staff failed";
  }
  res.json(responseType);
};
// update information of Service
export const UpdateService = async (req, res) => {
  const input = req.body;
  const responseType = {};
  // check input
  if (req.body.ServiceId === req.params.id) {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: input,
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
  } else {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// delete information of Service
export const DeleteService = async (req, res) => {
  const responseType = {};
  if (req.body.ServiceId === req.params.id) {
    const service = await Service.findByIdAndDelete(req.params.id);
    responseType.statusText = "Success";
    responseType.message = "Delete Successfully";
    responseType.status = 200;
  } else {
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
  if (Service) {
    const service = await Service.find();
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
