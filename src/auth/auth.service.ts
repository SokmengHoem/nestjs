import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/reister.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto) {
        const userExists = await this.userService.findOneByEmail(loginDto.email);

        if(!userExists){
            throw new BadRequestException('Invalid email or password');
        }

        //check password
        const passwordMatch = await this.userService.compareHash(
            loginDto.password,
            userExists.password, // hash from db
        );

        if(!passwordMatch) {
            throw new BadRequestException('Invalid email or password');
        }

        //generate Jwt
        const token = await this.jwtService.signAsync({
            userId: userExists.id, 
        })

        if(!token) {
            throw new BadRequestException('Invalid email or password');
        }

        return {
            access_token: token,
            token_type: 'bearer',
        }
    }

    async register(dto: RegisterDto) {
      const userExist = await this.userService.findOneByEmail(dto.email);

      if(userExist) {
        throw new BadRequestException('User already exist');
      }

      const user = await this.userService.create(dto);

      if(!user) {
        throw new BadRequestException('Register failed');
      }
      //generate Jwt => covert to function can reuseable
      const token = await this.jwtService.signAsync({
        userId: user.id, 
    })

    if(!token) {
        throw new BadRequestException('Invalid email or password');
    }

    return {
        access_token: token,
        token_type: 'bearer',
    }
    }
}
