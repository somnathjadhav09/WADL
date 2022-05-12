const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
const config = require("config")
const studentRoutes = require("./routes/student")
const app = express()
app.use(cors());
app.use(express.json())
app.use("/students" ,  studentRoutes)
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


const connectDB = async ()=>{
     try {
         await mongoose.connect(config.get("MONGO_URI"))
         console.log("database connected")
     } catch (error) {
         console.log(error)
     }
}


connectDB()


app.get("/" , (req , res)=>{
    res.send("Hello world")
})

const PORT = 5000
app.listen(PORT ,  ()=>{
    console.log(`Server has stated at PORT ${PORT}`)
})