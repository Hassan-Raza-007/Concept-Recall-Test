import mongoose from "mongoose";
const {Schema} = mongoose


const todoSchema = new Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
})

const todoModel = mongoose.model("todos",todoSchema)

export default todoModel