import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('onetomany/product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post()
    createProduct(){
        return this.productService.createProduct();
    }

    @Get()
    getProduct(){
        return this.productService.getProduct();
    }
}
