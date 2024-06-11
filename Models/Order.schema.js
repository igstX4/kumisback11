import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        image: {
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
        note: {
            type: String
        },
        product : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        count : Number,
        status: { // inProgress, payed, complete, cancelled
            type: String
        }
    }
);

export default mongoose.model('Order', OrderSchema);