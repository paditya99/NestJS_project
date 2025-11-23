import { IsInt, IsString } from "class-validator"

export class CustomerDTO{
    @IsString()
    name: string
    @IsInt()
    age: number
}