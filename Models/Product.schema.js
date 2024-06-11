import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        priceKiosk: {
            type: Number,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        options : [
            {
                name: { type: String, required: true },
                value: { type: String, required: true }
            }
        ],
        category: {
            type: String,
            required: true
        }, 
        totalCount: { type: String, required: true}
    }
);

export default mongoose.model('Product', ProductSchema);