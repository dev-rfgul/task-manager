import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    estTime: {
        type: Number,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: 'low',
    }

}, { timestamps: true });
const Task = mongoose.model('Task', taskSchema);
export default Task;