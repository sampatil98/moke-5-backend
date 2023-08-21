const mongoose=require("mongoose");

const doctorSchema= mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    spelization:{
        type:String,
        require:true,
        enum:["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"]
    },
    experiance:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    slot:{
        type:Number,
        require:true
    },
    fee:{
        type:Number,
        require:true
    }
});

const doctorModel= mongoose.model("doctordata",doctorSchema);

module.exports={doctorModel}