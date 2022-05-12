const express = require("express")
const path = require("path")
const app = express()
const musicRoutes = require("./router/index")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


const connectDB = async() =>{
    try {
        await mongoose.connect("mongodb+srv://sms0106:Megha%40123@cluster0.e06yn.mongodb.net/music?retryWrites=true&w=majority")
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}

connectDB()

/* app.use(express.json()) */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get("/",(req,res)=>{
    res.render("index.ejs",{name:"Megha"});
})

app.use("/music",musicRoutes);

app.use(express.static(path.join(__dirname,"public")))
app.listen(5000,()=>{
    console.log("Server started...")
})