import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        role: { // moderator || admin
            type: String,
            required: true
        }
    }
);

export default mongoose.model('Admin', AdminSchema);