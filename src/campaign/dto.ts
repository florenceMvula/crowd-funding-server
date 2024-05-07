import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCampaignDto{
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    story:string;

    @IsNotEmpty()
    @IsNumber()
    goal:number;

    @IsNotEmpty()
    @IsString()
    endDate:string;

    @IsNotEmpty()
    @IsNumber()
    userId:number;

    @IsNotEmpty()
    @IsString()
    image:string;

    constructor(d:CreateCampaignDto){
        this.username = d.username;
        this.title = d.title;
        this.story = d.story;
        this.goal = d.goal;
        this.endDate = d.endDate;
        this.userId = d.userId;
        this.image = d.image;
    }
}