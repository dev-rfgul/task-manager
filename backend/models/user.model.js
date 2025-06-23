import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "guest"], // allowed values
        default: "user",
        required: true,
    },

    dailyScore: {
        type: Number,
    },
    weeklyScore: {
        type: Number,
    },
    monthlyScore: {
        type: Number,
    },
    task_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        }
    ],
    rateLimit: {
        count: { type: Number, default: 0 },
        lastReset: { type: Date, default: Date.now },
    },
    whatsappNumber: {
        type: String,
        required: false,
    }




}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;