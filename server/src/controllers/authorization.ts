import { Request, Response } from 'express';
import * as redis from 'redis';

export const requireAuth=(req:Request, res:Response, next:any)=>{
    const { authorization } = req.headers;
    const redisClient = redis.createClient(process.env.REDIS_URI);
    if(!authorization){
        res.status(401).json('Unauthorized');
    }
    return redisClient.get(authorization, (err:any, reply:any)=>{
        if(err){
            res.status(401).json('Unauthorized');
        }
        return next();
    })
}