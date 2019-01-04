import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";



export const registerNewUser =async (req: Request, res: Response, db:any) => {
    try { 
    const { userName, userPassword } = req.body;
    const rowCount:number=await db.count('*').from('USERS').where({ USER_NAME: userName }).then((data:any)=> data[0].count);
    console.log(rowCount);

    if(rowCount>0){
        console.log("user existed in database");
        res.status(400).send("user existed in database")
    }else{
        const saltRounds:number = 10;
        bcrypt.hash(userPassword, saltRounds, (err, hashedPassword)=>{
            if(err){
                console.log(err);
                res.status(500).end();
            }

            db('USERS').insert({
                USER_NAME: userName,
                USER_PASSWORD: hashedPassword,
            }).then((data)=>console.log(data))
         
            res.status(200).send(userName+" inserted");
        })
    }
    } catch(err){
        console.log(err);
        res.status(500).end();
    }
}

export const addNewExercise=(req: Request, res: Response, db:any)=>{
    const { userId, description, duration, date } = req.body;
    try{
        db('EXERCISES').insert({
            DESCRIPTION: description,
            DURATION: duration,
            DATE: new Date(date),
            USER_ID: userId
        }).then((data:any)=>console.log(data))

        console.log(description+ " inserted ok");
        res.status(200).send(description+" has been added");
    } catch(error){
        console.log(error);
        res.status(500).end();
    }
}

export const getUserExerciseLog = async (req:Request, res:Response, db:any)=>{
    try {const userId:number = req.query.userId;
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;
    console.log(userId);

    const result:any = await db.select('USERS.USER_NAME', 'EXERCISES.DESCRIPTION').from('USERS').where({ USER_ID: userId })
        .leftJoin('EXERCISES', 'USERS.REFERENCE', '=', 'EXERCISES.USER_ID')
        .then((result:any)=> {
            console.log(result);
            return result;
        })
    
    res.status(200).json({
        userName: result[0].USER_NAME,
        exercise: result[0].DESCRIPTION,
    })
    } catch(err){
        console.log(err);
    }
}
