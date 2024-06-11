import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
    {
        secret: {
            type: String,
            required: true
        },
        isSecret: {
            type: Boolean,
            required: true
        }
    }
);

export default mongoose.model('Settings', SettingsSchema);