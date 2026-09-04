import express from "express";
import { Request,Response } from "express";
const app= express();

const PORT = 3000;

app.get("/api/hello",(req:Request,res:Response)=>{
   res.status(200).json({
    "message":"Hello from luffy",
    "success":"true"
  })
})

app.listen(PORT,()=>{
    console.log(`Server's listening on ${PORT}`);
})