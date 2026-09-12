import "dotenv/config"
import app from "./app.js";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async() : Promise<void>=>{
    await connectDb();
}

app.listen(PORT,()=>{
    console.log(`Server's Running on ${PORT}`);  
})

startServer();