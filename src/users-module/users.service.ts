import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.ts";
import Users from "./users.model.ts";
// import { Op } from "sequelize";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateJwt = (id: number, username: string, email: string | null, role: string) => {
    return jwt.sign(
        { id, username, email, role },
        process.env.SECRET_KEY!,
        { expiresIn: '24h' }
    );
}

class UserService {
    async registration(req: Request, res: Response, next: NextFunction) {
        const { username, password, email, role = 'User' } = req.body;
        
        if(!username || !password){
            return next(ApiError.badRequest('Incorrect username or password'))
        }

        const candidate_username = await Users.findOne({ where: { username } });
        const candidate_email = await Users.findOne({ where: { email } });

        if(candidate_username){
            return next(ApiError.badRequest('User with same username already exist'))
        }
        if (candidate_email){
            return next(ApiError.badRequest('User with same email already exist'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await Users.create( { username, password: hashPassword, email, role } );

        const token = generateJwt(user.id, user.username, user.email, user.role);

        return res.json({ token });
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        console.log(req.body);
        const user = await Users.findOne({ where: { username } });

        if(!user){
            return next(ApiError.badRequest('User with this username does not found'));
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.badRequest('Incorrent password'));
        }

        const token = generateJwt(user.id, user.username, user.email, user.role);

        return res.json({token});
    }

    async auth(req: Request, res: Response) {
        const user = JSON.parse(req.params.user);
        const token = generateJwt(user.id, user.username, user.email, user.role);
        return res.json({ token });
    }
}

export default new UserService()