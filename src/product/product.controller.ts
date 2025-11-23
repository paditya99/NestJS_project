import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { MynamePipe } from 'src/custom/pipes/myname/myname.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    @UseGuards(AuthGuard)
    getAllProducts(){
        return this.productService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id: string){
        return this.productService.getProductById(Number(id));
    }

    @Post()
    createProduct(@Body('name', new MynamePipe()) name: string, @Body('price') price: number){
        const body = { name, price };
        this.productService.createProduct(body);
    }

    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() body: {name: string, price: number}){
        this.productService.updateProduct(Number(id), body);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string){
        this.productService.deleteProduct(Number(id));
    }
}
