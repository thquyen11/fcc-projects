import { Request, Response } from "express";
import * as bcrypt from 'bcryptjs';
import { logger } from "../server";
import * as jwt from 'jsonwebtoken';


export const handleSignin= async (req: Request, res: Response, db:any)=>{
    try {const { userName, userPassword } = req.body;
        if(!userName || !userPassword){
            return Promise.reject('incorrect form submission');
        }

        const saltRound:number = 10;
        const hash:string = await bcrypt.hash(userPassword, saltRound, (err:any, hash:string)=>{
            return hash;
        })

        db.select('USER_NAME','USER_PASSWORD').from('USERS').where('USER_NAME','=',userName)
            .then((data:any)=> {
                const isValid = bcrypt.compareSync(hash, data[0].USER_PASSWORD);
                if(isValid){
                    logger.info(userName+': credential valid');
                    const user:any = db.select('REFERENCE', 'USER_NAME').from('USERS').where('USER_NAME','=',userName).then((user:any)=> user);
                    return {
                        userName: user[0].USER_NAME,
                        userId: user[0].REFERENCE,
                    };
                }else{
                    logger.error('incorrect password');
                    Promise.reject('incorrect username or password');
                }
            })
    } catch(err){
        logger.error(err);
    }
}

const getAuthTokenId=()=>{
    logger.info('auth ok');
}

const signToken=(userId:number, userName:string)=>{
    const jwtPayLoad = { userId, userName };
    return jwt.sign(jwtPayLoad, process.env.JWTSECRET, { expiresIn: '2 days' })
}

const createSessions=(user)=>{
    const { userName, userId } = user;
    const token:any = signToken(userId, userName);
    return Promise.resolve({
        sucess: 'true',
        userid: userId,
        token: token
    })
}

export const handleSigninAuthentication=(req:Request, res:Response, db:any)=>{
    const { authorization } = req.headers;
    return authorization? 
        getAuthTokenId() :
        handleSignin(req, res, db)
            .then((user:any)=> {
                user.userName && user.userId? 
                    createSessions(user): 
                    Promise.reject(user);
            })
            .then((session:any)=> res.status(200).json(session))
            .catch((err:any)=> res.status(400).json(err));
}

