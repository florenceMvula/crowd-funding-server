import compression from "compression";
import cors from "cors";
import express,{ Application, Request, Response } from "express";
import morgan from "morgan";
import userRouter from "./user/router";
import campaignRouter from "./campaign/router";


const app:Application = express();
const port = 9000;

app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

app.use("/user",userRouter);
app.use("/campaign",campaignRouter)

app.get("/",(_req:Request,res:Response)=>{
    res.send("Blockchain server is running");
});

const start = () => {
    app.listen(port,()=>{
        console.log(`Blockchain server is running on http://localhost:${port}`);
    });
}

start();