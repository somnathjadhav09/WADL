const mongoose = require("mongoose")

const musicSchema = mongoose.Schema({
  
    name:{
        type:String
    },
    film:{
        type:String
    },
    director:{
        type:String
    },
    singer:{
        type:String
    }
})

module.exports = mongoose.model("Music",musicSchema);