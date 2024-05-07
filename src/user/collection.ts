import { Request,Response } from "express";
import { LoginDto, RegisterDto } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma";
import { compare, hash } from "bcrypt";
import * as jwt from "jsonwebtoken"

export class UserCollection{
    async Register(req:Request,res:Response){
        try {
            const registerDto = new RegisterDto(req.body);

            const errors = await validate(registerDto);

            if(errors.length>0){
                return res.status(StatusCodes.CONFLICT).json({
                    error: errors.map((e)=>e.constraints)
                })
            }

            const isEmailExists = await prisma.user.findUnique({
                where: {
                    email: registerDto.email
                }
            });

            if(isEmailExists){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User with that email already exists"
                });
            }

            const hashPassword = await hash(registerDto.password,10);

            const user = await prisma.user.create({
                data:{
                    firstname:registerDto.firstname,
                    lastname:registerDto.lastname,
                    email:registerDto.email,
                    password:hashPassword
                }
            });

            return res.status(StatusCodes.CREATED).json(user);
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error.message,
                message: "something went wrong"
            })
        }
    }

    async Login(req:Request,res:Response){
        try {
            const loginDto = new LoginDto(req.body);

            const errors = await validate(loginDto);

            if(errors.length>0){
                return res.status(StatusCodes.CONFLICT).json({
                    error: errors.map((e)=>e.constraints)
                })
            }

            const user = await prisma.user.findUnique({
                where: {
                    email:loginDto.email,
                }
            })

            if(!user){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "incorrect email / user by that email not found",
                })
            }

            const comparePassword = await compare(loginDto.password,user.password);

            if(!comparePassword){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    "message": "password not correct"
                })
            }

            const payload = {
                id:user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email:user.email,
            }

            const token = await jwt.sign(payload,`${process.env.JWTSECRET}`)

            return res.status(StatusCodes.ACCEPTED).json(token);

        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "something went wrong",
                error: error.message
            })
        }
    }
}