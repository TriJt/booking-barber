import Staff from "../models/Staff/Staff.model.js"
import bcryptjs from 'bcryptjs';

// create information of Staff
// COMPLETE in back-end
export const CreateStaff = async (req, res) => {
    const responseType = {};
    const input = req.body;
    //create new user 
    try {
        const salt = await bcryptjs.genSaltSync(10);
        const pass = await input.Password
        const hashPassword = bcryptjs.hashSync(pass, salt);
        const newStaff = new Staff({
            Name: input.Name,
            Telephone: input.Telephone,
            Email: input.Email,
            Password: hashPassword,
            Gender: input.Gender,
            isAdmin: input.isAdmin,
        });
        //save Customer in database and return response
        const save = await newStaff.save();
        responseType.statusText = 'Success';
        responseType.message = 'Create new staff successfully';
        responseType.status = 200;
        responseType.value = save;
    } catch {
        responseType.statusText = 'Failed';
        responseType.status = 404;
        responseType.message = 'Create staff failed';

    }
    res.json(responseType);
}

// update information of Staff
// COMPLETE in back-end
export const UpdateStaff = async (req, res) => {
    const input = req.body;
    const responseType = {};
    // check input
    if (req.body.StaffId === req.params.id) {
        const staff = await Staff.findByIdAndUpdate(req.params.id, {
            $set: input
        }, {
            new: true
        })

        const save = await staff.save();
        responseType.statusText = 'Success';
        responseType.message = 'Update successfully';
        responseType.status = 200;
        responseType.value = save;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'Update Failed ';
        responseType.status = 404;
    }
    res.json(responseType);
}

// delete information of Staff
// COMPLETE in back-end
export const DeleteStaff = async (req, res) => {
    const responseType = {};
    if (req.body.StaffId === req.params.id) {
        const staff = await Staff.findByIdAndDelete(req.params.id);
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

// get information of Staff by id
// COMPLETE in back-end
export const GetStaffById = async (req, res) => {
    const responseType = {};
    const StaffId = req.query.StaffId;
    const Name = req.query.Name;
    if (Staff) {
        const staff = await StaffId ? await Staff.findById(StaffId) : await Staff.findOne({
            Name: Name
        })
        responseType.statusText = 'Success';
        responseType.message = 'Get customer successfully';
        responseType.status = 200;
        responseType.value = staff;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'We have error in somewhere';
        responseType.status = 404;
    }
    res.json(responseType);
}

// get all information of Staff 
// COMPLETE in back-end
export const GetStaffs = async (req, res) => {
    const responseType = {};
    if (Staff) {
        const staff = await Staff.find()
        responseType.statusText = 'Success';
        responseType.message = 'Get customer successfully';
        responseType.status = 200;
        responseType.value = staff;
    } else {
        responseType.statusText = 'Error';
        responseType.message = 'We have error in somewhere';
        responseType.status = 404;
    }
    res.json(responseType);
}

// count staff
// COMPLETE in back-end
export const CountStaff = async (req, res) => {
    const responseType = {};
    if (Staff) {
        const count = await Staff.countDocuments({})
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