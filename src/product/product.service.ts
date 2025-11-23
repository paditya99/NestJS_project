import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        {id: 1, name: "Mobile", price: 15000},
        {id: 2, name: "Tablet", price: 30000},
        {id: 3, name: "Laptop", price: 55000},
    ]

    getProducts(){
        return this.products;
    }

    getProductById(id: number){
        const product= this.products.find((prod)=> prod.id === id);
        if(!product){
            throw new NotFoundException('Product not found')
        }

        return product;
    }

    createProduct(product: {name: string; price: number}){
        const newprod={
            id: Date.now(),
            ...product
        }

        this.products.push(newprod);
        return newprod;
    }

    updateProduct(id: number, product: {name: string; price: number}){
        const prod=this.products.find((prod)=> prod.id === id);

        if(!prod){
            throw new NotFoundException('Product not found');
        }

        prod.name=product.name;
        prod.price=product.price;
        return prod;
    }

    deleteProduct(id: number){
        const prod=this.products.find((prod)=> prod.id === id);

        if(!prod){
            throw new NotFoundException('Product not found');
        }

        this.products=this.products.filter(p=> p.id !== id);
        return prod;
    }
}
