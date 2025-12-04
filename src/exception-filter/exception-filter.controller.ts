import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('exception-filter')
@UseFilters(HttpExceptionFilter)
export class ExceptionFilterController {
    @Get('hello/:id')
    getUserData(@Param('id', ParseIntPipe) id: number){
        return {message: `Your ID is: ${IdleDeadline}`}
    }
}
