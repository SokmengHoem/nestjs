import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';
import { JwtStrategy } from './strategies/access-jwt.strategy.ts';

@Module({
  imports: [
    UsersModule,
    AppConfigModule,
    JwtModule.registerAsync({
     imports: [AppConfigModule], // Ensure AppConfigModule is imported 
     inject: [AppConfigService],
     useFactory: async (appConfigService: AppConfigService) => ({
      secret: appConfigService.secretOrKey,
      signOptions: {expiresIn: appConfigService.jwtExpiration},
     }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
