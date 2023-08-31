import { Transform, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    name: string;

    is_deleted: boolean = false; 

    @Transform(() => new Date(), { toClassOnly: true })
    @Type(() => Date)
    created_at: Date;

    @Transform(() => new Date(), { toClassOnly: true })
    @Type(() => Date)
    updated_at: Date;
}
