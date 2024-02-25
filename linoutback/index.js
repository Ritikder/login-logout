import express from 'express'
import cors from 'cors'
import  mongoose  from 'mongoose'
const app=express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
mongoose.connect('mongodb://localhost:27017/loginlogout')
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const User=new mongoose.model("users",userSchema)

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
   const e=await User.findOne({email:email})
   if(e)
   {
    if(password===e.password)
    {
        res.send({message:"Login Successfull",user:e})
    }else{
        res.send({message:"Password didn't match"})
    }
   } 
   else{
    res.send({message:"User not reggistered"})
   }
})
app.post('/register',async(req,res)=>{
  const {name,email,password}=req.body
  const e=await User.findOne({email:email})
  if(e)
  {
    res.send({message:"user exits"})  
  }
  else{
    
    console.log("done")
    const user=new User({
                name,
                email,
                password
            })
          const r= await user.save()
          res.send(r)
  }

    
  })

app.listen(3000,()=>{
        console.log("d")
});