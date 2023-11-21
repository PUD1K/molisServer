import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const token = req.headers.authorization?.split(' ')[1];
        
        if(!token){
            return res.status(401).json({ message: 'Dont authorization' })
        }

        const decoded = jwt.verify(token!, process.env.SECRET_KEY!); 
        req.params.user = JSON.stringify(decoded);
        next();
    } catch (e){
        res.status(401).json({ message: e });
    }
}