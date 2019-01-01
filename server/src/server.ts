// import app from "./app";
import * as express from "express";
import { Request, Response } from "express";
require('dotenv').config();
require('ts-node').register();


const app = express();

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port ", process.env.PORT);
})

app.get("/", (req:Request, res:Response)=>{
    console.log(req);
    res.status(200).json("Homepage");
})

//FCC TIMESTMAP project
app.get("/api/timestamp/:date_string", (req:Request, res:Response)=>{
    const { date_string } = req.params;

    if(date_string){
        const date:Date = new Date(date_string);
        const error:any={
            "error": "Invalid Date",
        };
        if(date){
            const payload:any ={
                "unix": date.getTime(),
                "utc": date.toUTCString(),
            };
            res.status(200).json(payload);
        } else{
            res.status(200).json(error);
        }
    } else{
        const date:Date = new Date();
        const payload:any ={
            "unix": date.getTime(),
            "utc": date.toUTCString(),
        };

        res.status(200).json(payload);
    }
})

//FCC HEADER PARSER project
app.get("/api/whoami", (req:Request, res:Response)=>{
    const payload:any={
        "ipaddress": req.ip,
        "language": req.acceptsLanguages,
        "software": req.get("User-Agent"),
    }
    res.status(200).json(payload);
})






