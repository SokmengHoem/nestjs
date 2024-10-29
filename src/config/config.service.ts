import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {

    constructor(private configService: ConfigService){}

    get secretOrKey(): string {
        return this.configService.get<string>('SECRET_KEY_JWT');
    }

    get jwtExpiration(): string {
        return this.configService.get<string>('JWT_EXPIRATION') || '120s';
    }
}
