import { Request, Response } from "express";
import { CreateCampaignDto } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma";

export class CampaignCollection{
    async CreateCampaign(req:Request,res:Response){
        try {
            const Dto = new CreateCampaignDto(req.body);

            const errors = await validate(Dto);

            if(errors.length>0){
                return res.status(StatusCodes.CONFLICT).json({
                    error: errors.map((e)=>e.constraints)
                })
            }

            const campaign = await prisma.campaign.create({
                data:{
                    username:Dto.username,
                    title:Dto.title,
                    story:Dto.story,
                    goal:Dto.goal,
                    endDate:Dto.endDate,
                    image:Dto.image,
                    userId:Dto.userId
                }
            })

            return res.status(StatusCodes.CREATED).json(campaign)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                "message":" something wrong happened",
                error: error.message
            })
        }
    }

    async GetAllCampaigns(_req:Request,res:Response){
        try {
            const campaigns = await prisma.campaign.findMany();

            return res.status(StatusCodes.ACCEPTED).json(campaigns);
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                "message": "something went wrong",
                error: error.message,
            })
        }
    }

    async GetCampaignById(req:Request,res:Response){
        try {
            const id = Number(req.params.id);

            const campaign = await prisma.campaign.findUnique({
                where: {
                    id:id
                }
            });

            return res.status(StatusCodes.ACCEPTED).json(campaign);
        }catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                "message": "something went wrong",
                error: error.message,
            })
        }
    }

    async GetCampaignByUserId(req:Request,res:Response){
        try {
            const userid = Number(req.params.userid);

            const campaign = await prisma.campaign.findMany({
                where:{
                    userId:userid
                }
            });

            return res.status(StatusCodes.ACCEPTED).json(campaign);
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                "message": "something went wrong",
                error: error.message,
            })
        }
    }
}