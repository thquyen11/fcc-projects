import { Request, Response } from "express";
import * as bcrypt from 'bcryptjs';
import { logger } from "../server";
import * as jwt from 'jsonwebtoken';
import * as redis from 'redis';
import { resolve } from "bluebird";


export const handleSignin = (req: Request, res: Response, db: any) => {
    const { userName, userPassword } = req.body;
    if (!userName || !userPassword) {
        return Promise.reject('incorrect form submission');
    }
    console.log(userName + ' ' + userPassword);

    db.select('*').from('USERS').where({USER_NAME: userName})
        .then((user: any) => {
            console.log('query ' + user[0].USER_NAME);
            const isValid = bcrypt.compareSync(userPassword, user[0].USER_PASSWORD);
            if (isValid) {
                logger.info(user[0].USER_NAME + ': credential valid');
                logger.info('userId '+ user[0].REFERENCE)
                return Promise.resolve({
                    userId: user[0].REFERENCE,
                    userName: user[0].USER_NAME
                });
            } else {
                logger.error('incorrect password');
                Promise.reject('incorrect username or password');
            }
        })
        .catch((err: any) => {
            console.log(err);
            return Promise.reject('user not existed');
        })
}

const redisClient: any = redis.createClient(process.env.REDIS_URI);
const getAuthTokenId = (req: Request, res: Response, db: any) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, async (err: any, reply: any) => {
        if (err) {
            return res.status(400).json('Unauthorized');
        }

        const userName: string = await db.select('USER_NAME').from('USERS').where({REFERENCE: reply});
        return res.json({ userId: reply, userName: userName })
    })

}

//create jwt token
const signToken = (userId: number, userName: string) => {
    const jwtPayLoad = { userId, userName };
    return jwt.sign(jwtPayLoad, process.env.JWTSECRET, { expiresIn: '1 days' })
}

//save jwt token to Redis
const setToken = (key: any, value: number) => {
    return Promise.resolve(redisClient.set(key, value, 'EX', 600)); //this key will expire after 600 seconds
}

const createSessions = (user) => {
    const { userName, userId } = user;
    const token: any = signToken(userId, userName);
    return setToken(token, userId)
        .then(() => {
            return {
                sucess: 'true',
                userId: userId,
                token: token
            }
        })
        .catch((err: any) => console.log(err))
}

export const handleSigninAuthentication = (req: Request, res: Response, db: any) => {
    const { authorization } = req.headers;
    return authorization ?
        getAuthTokenId(req, res, db) :
        handleSignin(req, res, db)
            .then((user: any) => {
                logger.info('user '+user);
                user.userName && user.userId ?
                    createSessions(user) :
                    Promise.reject(user);
            })
            .then((session: any) => res.status(200).json(session))
            .catch((err: any) => res.status(400).json(err));
}

