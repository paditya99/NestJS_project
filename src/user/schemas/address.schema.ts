import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Address{
    @Prop()
    street: string

    @Prop()
    city: string
}