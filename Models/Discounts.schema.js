import mongoose from 'mongoose';

const DiscountsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            // required: true
        }
    }
);

export default mongoose.model('Discounts', DiscountsSchema);