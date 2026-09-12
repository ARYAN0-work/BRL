import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send("BRL TASK 1")
})

export default app;