import { PartialType } from "@nestjs/mapped-types";
import { LoginAuthDto } from "./login-auth.dto";
import { IsNotEmpty } from "class-validator";
import { Transform, Type } from "class-transformer";

export class ResgisterAuthDto extends PartialType(LoginAuthDto)  {
    @IsNotEmpty()
    full_name: string;

    is_deleted: boolean = false; 
    created_at: Date = new Date();
    updated_at: Date = new Date();
}
