import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}

    @Get()
    getCustomers(){
        return this.customerService.getCustomers();
    }

    @Get(':id')
    getCustomerById(@Param('id') id: string){
        return this.customerService.getCustomerById(Number(id));
    }

    @Post()
    addCustomer(@Body() customerDto: CustomerDTO){
        return this.customerService.addCustomer(customerDto);
    }
}
