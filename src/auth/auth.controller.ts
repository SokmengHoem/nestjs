import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/reister.dto';
import { AccessJwtAuthGuard } from './guards/access-jwt.guard';
import { Public } from 'src/shared/decorators/public_decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    @Public()
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('me')
    //@UseGuards(AccessJwtAuthGuard) //protect route local
    me() {
        return 'about me';
    }
}
