import { IsEmail, Length, IsNotEmpty, maxLength, minLength, MinLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateUserDto {

    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8) 
    password: string;

    is_deleted: boolean = false; 

    @Transform(() => new Date(), { toClassOnly: true })
    @Type(() => Date)
    created_at: Date;

    @Transform(() => new Date(), { toClassOnly: true })
    @Type(() => Date)
    updated_at: Date;
}

