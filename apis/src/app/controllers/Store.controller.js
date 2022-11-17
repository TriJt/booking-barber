import { Banner, Store } from "../models/Store/Store.model.js";

// create information of store
// COMPLETE
export const CreateStore = async (req, res) => {
  const responseType = {};
  const input = req.body;
  // validate input
  if (!input) {
    responseType.message = "isValid";
    responseType.statusText = "Error";
  }

  const newStore = new Store({
    Name_Store: input.Name_Store,
    Telephone: input.Telephone,
    Number: input.Number,
    Street: input.Street,
    District: input.District,
    City: input.City,
    Description: input.Description,
  });

  // save store in database
  const saveStore = await newStore.save();
  responseType.statusText = "Success";
  responseType.message = "Create successfully";
  responseType.status = 200;
  responseType.value = saveStore;
  res.json(responseType);
};

// update information of store
// COMPLETE
export const UpdateStore = async (req, res) => {
  const responseType = {};
  if (req.body.Name_Store === req.params.Name_Store) {
    const store = await Store.findOneAndUpdate(
      req.body.Name_Store,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    const saveStore = await store.save();
    responseType.statusText = "Success";
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = saveStore;
  } else {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get information of store by id
// COMPLETE
export const GetStores = async (req, res) => {
  const responseType = {};
  if (Store) {
    const store = await Store.find();
    responseType.statusText = "Success";
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = store;
  } else {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// create banner for store to show in front-end
export const CreateBanner = async (req, res) => {
  const responseType = {};
  const input = req.body;

  if (!input) {
    responseType.message = "isValid";
    responseType.statusText = "Error";
  }
  const newBanner = new Banner({
    Image: input.Image,
    Description: input.Description,
  });

  const store = "6353b7be74491dc7f016e0d5";
  const saveBanner = await newBanner.save();

  await Store.findOneAndUpdate(
    { _id: store },
    {
      $push: { Banner: saveBanner._id },
    },
    {
      new: true,
    }
  );
  responseType.statusText = "Success";
  responseType.message = "Create successfully";
  responseType.status = 200;
  responseType.value = saveBanner;
  res.json(responseType);
};
//update banner
export const UpdateBanner = async (req, res) => {
  const responseType = {};

  const id = req.params.id;
  const banner = await Banner.findByIdAndUpdate(
    { _id: id },
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  const saveBanner = await banner.save();
  responseType.statusText = "Success";
  responseType.message = "Create successfully";
  responseType.status = 200;
  responseType.value = saveBanner;
  res.json(responseType);
};

// delete banner
export const DeleteBanner = async (req, res) => {
  const responseType = {};
  const store = "6353b7be74491dc7f016e0d5";
  try {
    await Banner.findByIdAndDelete(req.params.bannerId);
    try {
      await Store.findOneAndUpdate(
        { _id: store },
        {
          $pull: { Banner: req.params.bannerId },
        },
        { new: true }
      );
      responseType.statusText = "Success";
      responseType.message = "Delete successfully";
      responseType.status = 200;
      res.json(responseType);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    responseType.statusText = "Failed";
    responseType.message = "Delete Failed";
    responseType.status = 500;
  }
};

export const getBanner = async (req, res) => {
  const responseType = {};
  if (Banner) {
    const banner = await Banner.find();
    responseType.statusText = "Success";
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = banner;
  } else {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};
