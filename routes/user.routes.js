const {Router}=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();

const {UserModel}=require("../model/user.model")

const userRouter=Router();

userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user= await UserModel.findOne({email});

        if(!user){
            return res.status(400).send({
                isError:true,
                message:"wrong E-mail id"
            })
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){

                const token=jwt.sign({userId:user._id},process.env.secretkey);
                return res.status(200).send({
                    isError:false,
                    message:"logged in successfully",
                    token:token
                })

            }else{
                return res.status(400).send({
                    isError:true,
                    message:"wrong password"
                })
            }
        });
        
    } catch (error) {
        return res.status(400).send({
            isError:true,
            message:error.message
        })
    }
});

userRouter.post("/register",async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user= await UserModel.findOne({email});

        if(user){
         return   res.status(400).send({
                isError:true,
                message:"User already exist please login"
            })
        }

        bcrypt.hash(password, 5, async function(err, hash) {
            if(hash){
                const data= new UserModel({...req.body,password:hash});
                await data.save()
                res.status(400).send({
                    isError:false,
                    message:"User created successfully"
                })
            }else{
                res.status(500).send({
                    isError:true,
                    message:"internal server error"
                })
            }
        });

        
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
});

module.exports={userRouter};