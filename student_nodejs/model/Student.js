const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    WAD_Marks: {
        type: Number
    },
    CC_Marks: {
        type: Number
    },
    AI_Marks: {
        type: Number
    },
    DSBDA_Marks: {
        type: Number
    },
    CNS_Marks: {
        type: Number
    }

}, { timestamps: true })

module.exports = mongoose.model("studentmarks" ,  studentSchema)