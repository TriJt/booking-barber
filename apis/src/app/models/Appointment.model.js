import mongoose, {
    Schema
} from "mongoose";
const AppointmentSchema = new mongoose.Schema({
    Staff_id: {
        type: String
    },
    Name: {
        type: String
    },
    Telephone: {
        type: String
    },
    Service: {
        type: Array
    },
    Status: {
        type: String
    },
    Slots: {
        type: Array
    }
}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;