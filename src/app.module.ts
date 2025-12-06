import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionFilterController } from './exception-filter/exception-filter.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { EnvService } from './env/env.service';
import { EnvController } from './env/env.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule as OneToManyProductModule } from './one-to-many/product/product.module';
import { LibraryModule } from './library/library.module';
import { ProjectModule } from './project/project.module';



@Module({
  imports: [ProductModule, CustomerModule, ConfigModule.forRoot({
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.MONGO_URI!),
  StudentModule,
  UserModule,
  EmployeeModule,
  OneToManyProductModule,
  LibraryModule,
  ProjectModule
],
  controllers: [AppController, ProductController, UserRolesController, ExceptionFilterController, EnvController],
  providers: [AppService, ProductService, EnvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
  
}
