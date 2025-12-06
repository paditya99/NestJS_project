import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name) private employeeModel: Model<Employee>, 
        @InjectModel(Profile.name) private profileModel: Model<Profile>
    ){}

    async createEmployee(): Promise<Employee>{
        const profile=await this.profileModel.create({
            salary: 20000,
            degree: 'MCA'
        })
        const employee=new this.employeeModel({
            name: 'Aditya',
            profile: profile._id
        })
        return employee.save();
    }

    async getEmployees():Promise<Employee[]>{
        return this.employeeModel.find().populate('profile').exec();
    }
}
