import Store from "../models/Store/Store.model.js"

// create information of store 
// COMPLETE  
export const CreateStore = async (req, res) => {
    const responseType = {};
    const input = req.body;
    // validate input
    if (!input) {
        responseType.message = "isValid"
        responseType.statusText = "Error"
    }

    const newStore = new Store({
        Name_Store: input.Name_Store,
        Telephone: input.Telephone,
        Number: input.Number,
        Street: input.Street,
        District: input.District,
        City: input.City,
        Description: input.Description
    });

    // save store in database
    const saveStore = await newStore.save(newStore);
    responseType.statusText = 'Success';
    responseType.message = 'Update successfully';
    responseType.status = 200;
    responseType.value = saveStore;
    res.json(responseType);

}

// update information of store
// COMPLETE 
export const UpdateStore = async (req, res) => {
    const responseType = {};
    const input = req.body;
    if (input.Name_Store === req.params.Name_Store) {
        const store = await Store.findOneAndUpdate(input.Name_Store, {
            $set: input
        }, {
            new: true
        })
        const saveStore = await store.save();
        responseType.statusText = 'Success';
        responseType.message = 'Update successfully';
        responseType.status = 200;
        responseType.value = saveStore;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'Update Failed ';
        responseType.status = 404;
    }
    res.json(responseType);
}


// get information of store by id
// COMPLETE
export const GetStores = async (req, res) => {
    const responseType = {};
    if (Store) {
        const store = await Store.find()
        responseType.statusText = 'Success';
        responseType.message = 'Update successfully';
        responseType.status = 200;
        responseType.value = store;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'Update Failed ';
        responseType.status = 404;
    }
    res.json(responseType);
}