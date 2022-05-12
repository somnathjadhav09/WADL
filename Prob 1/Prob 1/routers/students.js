const express=require('express')
const router=express.Router()
const Student=require('../models/student')

router.get('/',async(req,res)=>{
    try{
        const students= await Student.find()
        res.json(students)
    }catch(err){

    }
})

router.get('/getCount',async(req,res)=>{
    try{
        const students= await Student.find()
        res.json(students.length)
    }catch(err){

    }
})

router.get('/filter',async(req,res)=>{
    try{
        const students= await Student.find({marks:{$gte:90}},'name')

        res.json(students.name)
    }catch(err){

    }
})

router.get('/:id',async(req,res)=>{
    try{
        const student= await Student.findById(req.params.id)
        res.json(student)
    }catch(err){
        res.send('Error'+err)
    }
})

router.post('/',async(req,res)=>{
    const student=new Student({
        name:req.body.name,
        roll_no:req.body.roll_no,
        marks:req.body.marks,

    })
    try{
        const s1=await student.save()
        res.json(s1)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const student=await Student.findById(req.params.id)
        student.marks=req.body.marks
        const s1= await student.save()
        res.json(s1)
    }catch(e){
        res.send('Error')
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const student=await Student.findById(req.params.id)
        student.marks=req.body.marks
        const s1= await student.remove()
        res.json(s1)
    }catch(e){
        res.send('Error')
    }
})
module.exports=router