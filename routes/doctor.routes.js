const {Router}=require("express");
require("dotenv").config();

const {doctorModel}=require("../model/doctor.model")

const doctorRouter=Router();

doctorRouter.get("/",async(req,res)=>{
    try {
        const {filter,sort,search}=req.query;
        if(filter){
            const data= await doctorModel.find({spelization:filter});

        return   res.status(200).send({
                isError:true,
                data:data
            }) 
        }
        if(sort){
            let value=(sort=="asc")?1:-1;
            const data= await doctorModel.find().sort({fee:value});

        return   res.status(200).send({
                isError:true,
                data:data
            }) 
        }
        if(search){
            
            const data= await doctorModel.find({name:{ $regex: search, $options: 'i' } })

        return   res.status(200).send({
                isError:true,
                data:data
            }) 
        }
        const data= await doctorModel.find();

        res.status(200).send({
            isError:true,
            data:data
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
});

doctorRouter.post("/create",async(req,res)=>{
    try {

        const data= new doctorModel(req.body);
         await data.save();

        res.status(200).send({
            isError:false,
            message:"appointment created successfully"
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
})

doctorRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const data= await doctorModel.findByIdAndDelete(id);
    
        res.status(200).send({
            isError:true,
            message:"appointment deleted successfully"
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
})

doctorRouter.patch("/update/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const data= await doctorModel.findByIdAndUpdate(id,req.body);
    
        res.status(200).send({
            isError:true,
            message:"appointment Updated successfully"
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
})





module.exports={doctorRouter}
