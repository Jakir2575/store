const express = require("express");
const app = express();
const connectdB = require("./config/dB")
const dotenv = require("dotenv")
const cors = require("cors")
const userRouter = require("./routes/User")
const productRouter = require("./routes/Product")
const path = require("path")
const PORT = 5000
dotenv.config()
connectdB();

///// serve static file from upload directory

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(cors());
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)



app.get("/",(req,res)=>{
    res.send("snehal")
});

app.listen(PORT, ()=>{
    console.log("server is running",PORT);
})