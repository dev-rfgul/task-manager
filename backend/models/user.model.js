import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
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
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
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
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;