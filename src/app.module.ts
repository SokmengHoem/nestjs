import {  Module} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { AccessJwtAuthGuard } from './auth/guards/access-jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'TestDB',
      entities: [User],
      synchronize: true,//use for development
    }),
    UsersModule,
    AuthModule,
    AppConfigModule,
  ],
  controllers: [],
  providers: [
    {
      useClass: AccessJwtAuthGuard,
      provide: APP_GUARD,
    }
  ],
})
export class AppModule {}