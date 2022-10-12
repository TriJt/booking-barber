import Customer from "../models/Customer/Customer.model.js"


// update information of Customer
// Complete in back-end
// Need connection to front-end
export const UpdateCustomer = async (req, res) => {
    const input = req.body;
    const responseType = {};
    // check input
    if (!input) {
        responseType.message("Input can null")
    }
    if (req.body.CustomerId === req.params.id) {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: input
        }, {
            new: true
        })

        const saveCustomer = await customer.save();
        responseType.statusText = 'Success';
        responseType.message = 'Update successfully';
        responseType.status = 200;
        responseType.value = saveCustomer;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'Update Failed ';
        responseType.status = 404;
    }
    res.json(responseType);

}


// delete information of Customer
// Complete in back-end
// Need connection to front-end
export const DeleteCustomer = async (req, res) => {
    const responseType = {};
    if (req.body.CustomerId === req.params.id) {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        responseType.statusText = 'Success';
        responseType.message = 'Delete Successfully';
        responseType.status = 200;
    } else {
        responseType.statusText = 'Failed';
        responseType.message = 'Delete Failed';
        responseType.status = 500;
    }
    res.json(responseType)
}

// get information of Customer by id and name
// Complete in back-end
// Need connection to front-end
export const GetCustomerById = async (req, res) => {
    const responseType = {};
    const CustomerId = req.query.CustomerId;
    const Name_Customer = req.query.Name_Customer;
    if (Customer) {
        const customer = CustomerId ? await Customer.findById(CustomerId) : await Customer.findOne({
            Name_Customer: Name_Customer
        })
        responseType.statusText = 'Success';
        responseType.message = 'Get customer successfully';
        responseType.status = 200;
        responseType.value = customer;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'We have error in somewhere';
        responseType.status = 404;
    }
    res.json(responseType);
}

// get all information of Customer
// Complete in back-end
// Need connection to front-end
export const GetCustomers = async (req, res) => {
    const responseType = {};
    if (Customer) {
        const customer = await Customer.find()
        responseType.statusText = 'Success';
        responseType.message = 'Get customer successfully';
        responseType.status = 200;
        responseType.value = customer;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'We have error in somewhere';
        responseType.status = 404;
    }
    res.json(responseType);
}

// Count customer
// Complete back-end 
// Not connection to front-end 
export const CountCustomer = async (req, res) => {
    const responseType = {};
    if (Customer) {
        const count = await Customer.countDocuments({})
        responseType.statusText = 'Success';
        responseType.message = 'Count customer successfully';
        responseType.status = 200;
        responseType.value = count;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'We have error in somewhere';
        responseType.status = 404;
    }
    res.json(responseType);
}