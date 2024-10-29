import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
    constructor(private appConfigService: AppConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfigService.secretOrKey, // Make sure you use the correct property
        });
    }

    async validate(payload: any) {
        console.log(payload);
        return { ok: 'ok' };
    }
}