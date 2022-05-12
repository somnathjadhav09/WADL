const { Router } = require("express")
const Student = require("../model/Student")

const router = Router()

router.get("/test" , (req , res)=>{
    res.render("student")
})

// @route : Display total count of documents and List all the documents in browser.
router.get("/",  async (req, res) => {
    try {
       const students  = await Student.find({})
       if(students.length == 0)
       {
           return  res.status(400).json({msg : "No student present in database"})
       }
        return   res.json({"count": students.length , students})
    } catch (error) {
        console.log(error)
    }
})


// @route : List the names of students who got more than 20 marks in DSBDA Subject in browser.
router.get("/dsbda" , async(req , res)=>{
    try {
        let students = await Student.find({DSBDA_Marks: {$gte : 20}})
        return res.json(students)
    } catch (error) {
        console.log(error)
    }
})


// @route : Update the marks of Specified students by 10.
router.post("/:rollNo" , async(req , res)=>{
    try {
        let student = await Student.findOne({rollNo: req.params.rollNo})

        if(!student){
            return res.status(400).json({msg : "Student does not exists"})
        }
        student.DSBDA_Marks += 10;
        student.CNS_Marks+=10
        student.AI_Marks+=10
        student.CC_Marks+=10
        student.WAD_Marks+=10

        await student.save()

        return res.json(student)
    } catch (error) {
        console.log(error)
    }
})

// @route  : List the names who got more than 25 marks in all subjects in browser.
router.get("/all" , async(req , res)=>{
    try {
        let students = await Student.find({$and:[{DSBDA_Marks: {$gte : 25}}, {CC_Marks: {$gte : 25}} , {CNS_Marks: {$gte : 25}} , {AI_Marks: {$gte : 25}} , {WAD_Marks: {$gte : 25}}]})
        return res.json(students)
    } catch (error) {
        console.log(error)
    }
})

// @route  : create student in database
router.post("/", async (req, res) => {
    try {
        const { name, rollNo, WAD_Marks, AI_Marks, CC_Marks, CNS_Marks, DSBDA_Marks } = req.body

        let s  =  await Student.find({rollNo})

        if(s.length > 0){
            return res.status(400).json({msg  : "Student with given roll no already exists"})
        }


        let newstudent = new Student({
            name, rollNo, WAD_Marks, AI_Marks, CC_Marks, CNS_Marks, DSBDA_Marks
        })

        await newstudent.save()

        return res.json(newstudent)
    } catch (error) {
        console.log(error)
    }
})



// @route: Remove specified student document from collection.
router.delete("/:id" , async(req , res)=>{
    try {
        let student = await Student.findByIdAndDelete(req.params.id)

        if(!student){
            return res.status(400).json({msg : "Student does not exists"})
        }
        
        return res.json(student)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router