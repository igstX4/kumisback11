import mongoose from 'mongoose';

const SliderSchema = new mongoose.Schema(
    {
        items: {
            type: [],
            required: true
        },
    }
);

export default mongoose.model('Slider', SliderSchema);