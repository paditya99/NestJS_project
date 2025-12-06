import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './schemas/library.schema';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Library.name) private libraryModel: Model<Library>,
        @InjectModel(Book.name) private bookModel: Model<Book>
    ){}

    async createLibrary(): Promise<Library>{
        const book1= await this.bookModel.create({
            title: 'C++ programming',
            author: 'ABC'
        })
        const book2= await this.bookModel.create({
            title: 'Java programming',
            author: 'XYZ'
        })
        const library=new this.libraryModel({
            name: 'Central Library',
            books: [book1._id, book2._id]
        })
        return library.save();
    }

    async getLibrary(): Promise<Library[]>{
        return this.libraryModel.find().populate('books').exec();
    }
}
