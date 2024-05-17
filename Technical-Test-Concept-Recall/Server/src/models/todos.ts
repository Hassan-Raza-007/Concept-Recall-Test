import mongoose from "mongoose";
const { Schema } = mongoose


const todoSchema = new Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
})

const todoModel = mongoose.model("todos", todoSchema)

export default todoModel