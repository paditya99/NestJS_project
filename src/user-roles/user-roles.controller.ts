import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {
    @Get('admin-route')
    @UseGuards(RolesGuard)
    @Roles('admin')
    getAdminData(){
        return {message: 'Only Admin can access'}
    }

    @Get('user-route')
    getUserData(){
        return {message: 'Anyone can access'}
    }
}
