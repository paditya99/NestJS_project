import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser(): Promise<User>{
        const newUser={
            name: 'Aditya',
            address: {
                street: 'Sector 50',
                city: 'Noida'
            }
        }

         return await this.userModel.create(newUser);
    }

    async getAllUsers(): Promise<User[]>{
         return this.userModel.find().exec();
    }

  
}
