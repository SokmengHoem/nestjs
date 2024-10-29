import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  //inject userRepository
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userEntity = this.userRepository.create(createUserDto);
      
      //TODO: 
      //hash password
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);

      if(!passwordHash){
        throw new BadRequestException('Password not hashed');
      }

      //userEntity.password = passwordHash; // has password
      //const user = await this.userRepository.save(userEntity);
      //or
      const user = await this.userRepository.save({
        ...userEntity,
        password: passwordHash
      })

      if (!user) {
        throw new BadRequestException('User not created');
      }
      return user;
    } catch (error) {
      //we need put condition becuase we has custom message
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['firstName', 'lastName'],
      searchableColumns: ['firstName', 'lastName'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const userUpdated = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    if (!userUpdated) {
      throw new BadRequestException('User not updated');
    }

    return userUpdated;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const deleteUser = await this.userRepository.delete(id);

    if (!deleteUser) {
      throw new BadRequestException('User not deleted');
    }

    return {
      message: 'User delete successfully',
    };
  }

  //compare hash string
  async compareHash(text: string, hash: string) {
    try{
      return await bcrypt.compare(text, hash);
    }catch (error) {
      throw new BadRequestException(error);
    }
  }
}
