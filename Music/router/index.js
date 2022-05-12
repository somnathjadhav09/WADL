const express = require("express")
const router = express.Router();
const Music  = require("../model/Music")

//read route

router.get("/",async(req,res)=>{
    const musics = await Music.find({})
    res.render("index.ejs", {musicList:musics} )
   
});

router.post("/",async(req,res)=>{
    try{
        console.log("POST ")
        const {name,film,director,singer} = req.body;
        let newData = new Music({name,film,director,singer});
        newData.save();
    
        res.redirect('/music')
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get("/add/form",(req,res)=>{
    res.render("addNew.ejs")
})

//update
router.post("/update/:id",async(req,res)=>{
    try {
        const{name,film,director,singer} = req.body;
        const id = req.params.id;
        let updatedMusic = await Music.findByIdAndUpdate(id,{name,film,director,singer})
        res.redirect("/music")
    } catch (error) {
        console.log(error)
    }
})

//update form
router.get("/:id/update/form",async(req,res)=>{
    const id = req.params.id;
    const data = await Music.findById(id)
   
    res.render('update.ejs',{data})
})
//delete
router.post("/:id/delete",async(req,res)=>{
    try {
        let id = req.params.id;
        let deletedUser = await Music.findByIdAndDelete(id)
        res.redirect("/music")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;