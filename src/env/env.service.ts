import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
    constructor(private configService: ConfigService){}

    getEnvData(){
        return this.configService.get<string>('DATABASE_URL');
    }
}
