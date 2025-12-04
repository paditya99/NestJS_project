import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Profile } from "./profile.schema";

@Schema()
export class Employee extends Document{
    @Prop()
    name: string

    @Prop({type: Types.ObjectId, ref: Profile.name})
    profile: Profile
}

export const EmployeeSchema=SchemaFactory.createForClass(Employee);