import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        products: [],
        count: Number,
        status: { // inProgress, payed, complete, cancelled
            type: String
        }
    }
);

export default mongoose.model('Order', OrderSchema);