import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    mondaysTask: {
        type: String,
    },
    tuesdaysTask: {
        type: String,
    },
    wednesdaysTask: {
        type: String,
    },
    thursdaysTask: {
        type: String,
    },
    fridaysTask: {
        type: String,
    },
    saturdaysTask: {
        type: String,
    },
    sundaysTask: {
        type: String,
    },
    scheduledTaskByAI: {
        type: String,
    }
}, { timestamps: true });
const Task=mongoose.model('Task',taskSchema);
export default Task;