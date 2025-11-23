import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDTO } from './dto/customer.dto';
import { CustomerInterface } from './interface/customer.interface';

@Injectable()
export class CustomerService {

    private customers: CustomerInterface[]= [];

    getCustomers(): CustomerInterface[]{
        return this.customers;
    }

    getCustomerById(id: number): CustomerInterface{
       const cust= this.customers.find((cust)=> cust.id===id)
       if(!cust){
        throw new NotFoundException("Customer not found")
       }

       return cust;
    }

    addCustomer(customerDto: CustomerDTO): CustomerInterface{
        const newcust: CustomerInterface={
            id: Date.now(),
            ...customerDto
        }

        this.customers.push(newcust);
        return newcust;
    }

}
