// import app from "./app";
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
require('dotenv').config();
require('ts-node').register();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port ", process.env.PORT);
})

const db:any={
    shortenURL:[],
}

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

//FCC Shorten URL project
app.post("/api/shorturl/new", (req:Request, res:Response)=>{
    const url:string = req.body.replace(/\r\n|\r|\n/gm, "");
    const regex:any = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if(url.match(regex)){
        db.shortenURL.push(url);
        res.status(200).json({
            "original_url": url,
            "short_url": (db.shortenURL.length-1),
        })
    } else{
        res.status(400).json(()=>{
            return{
                "error": "invalid URL",
            }
        })
    }
})

app.get("/api/shorturl/:shortURL", (req:Request, res:Response)=>{
    const { shortURL } = req.params;
    const shortUrl:number = parseInt(shortURL,10);

    if(shortUrl>(db.shortenURL.length-1)){
        res.status(400).json(()=>{
            return{
                "error": "invalid URL",
            }
        })
    } else{
        const originalUrl:string = db.shortenURL[shortUrl];
        res.redirect(originalUrl);
    }
})






