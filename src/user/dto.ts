import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    @IsString()
    firstname:string;

    @IsNotEmpty()
    @IsString()
    lastname:string;
    

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    constructor(d:RegisterDto){
        this.firstname = d.firstname;
        this.lastname = d.lastname;
        this.email = d.email;
        this.password = d.password;
    }
}

export class LoginDto{
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    constructor(d:LoginDto){
        this.email = d.email;
        this.password = d.password;
    }
}