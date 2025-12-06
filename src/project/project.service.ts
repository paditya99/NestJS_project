import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { Developer } from './schemas/developer.schema';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project>,
        @InjectModel(Developer.name) private developerModel: Model<Developer>
    ){}


    async seed(): Promise<{dev1: Developer, dev2: Developer}>{
        //first create projects
       const [project1, project2]=await Promise.all(
        [
            this.projectModel.create({title: 'UOB SCF'}),
            this.projectModel.create({title: 'HUBS'})
        ]
       )

        //then create developers
        const [dev1, dev2]=await Promise.all(
            [
                this.developerModel.create({name: 'Aditya', projects: [project1._id, project2._id]}),
                this.developerModel.create({name: 'Shivam', projects: [project1._id]})
            ]
        )

        //again update projects with developers setting
        await Promise.all(
            [
                this.projectModel.findByIdAndUpdate(project1._id, {
                    $set: {
                        developers: [dev1._id, dev2._id]
                    }
                }),
                this.projectModel.findByIdAndUpdate(project2._id, {
                    $set: {
                        developers: [dev1._id]
                    }
                })

            ]
        )

        return {dev1, dev2};
    }

    async getDevelopers(): Promise<Developer[]>{
        return this.developerModel.find().populate('projects').exec();
    }

    async getProjects(): Promise<Project[]>{
        return this.projectModel.find().populate('developers').exec();
    }
}
