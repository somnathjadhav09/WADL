const mongoose=require('mongoose')
const router = require('../routers/students')

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    roll_no:{
        type:Number,
        required:true
    },
    marks:{
        type:Number,
        required:true
    },
})


module.exports=mongoose.model('Student',studentSchema)