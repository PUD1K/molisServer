import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

interface iUser extends JwtPayload {
    id: number;
    username: string;
    email: string | null;
    role: string;
}


export default function(role: string){
    return function(req: Request, res: Response, next: NextFunction){
        if(req.method === 'OPTIONS'){
            next();
        }
        try{
            const token = req.headers.authorization?.split(' ')[1];

            if(!token){
                return res.status(401).json({ message: 'Dont authorization' });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as iUser;
            if(decoded.role !== role){
                return res.status(401).json({ message: 'No access' })
            }

            req.params.user = JSON.stringify(decoded);
            next()
        } catch(e) {
            res.status(401).json({ message: e });
        }
    }
}