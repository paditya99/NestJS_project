import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ){}

    async createStudent(data: Partial<Student>): Promise<Student>{
        const newStudent= new this.studentModel(data);
        return newStudent.save();
    }

    async getAllStudents(): Promise<Student[]>{
        return this.studentModel.find().exec();
    }

    async getStudent(id: string): Promise<Student | null>{
        return this.studentModel.findById(id).exec();
    }

    async putStudent(id: string, data: Partial<Student>): Promise<Student | null>{       //put
        //return this.studentModel.findByIdAndUpdate(id, data, {new: true}).exec();
        const updatedStudent = {
            name: data.name ?? null,
            email: data.email ?? null,
            age: data.age ?? null
        }
        return this.studentModel.findByIdAndUpdate(id, updatedStudent, {overwrite: true, new: true}).exec();
    }

    async patchStudent(id: string, data: Partial<Student>): Promise<Student | null>{       //patch
        return this.studentModel.findByIdAndUpdate(id, data, {new: true}).exec();
    }

    async deleteStudent(id: string): Promise<Student | null>{
        return this.studentModel.findByIdAndDelete(id).exec();
    }


    
}
