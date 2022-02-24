import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, CreateUserDtoTest } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getAllUsers() {
        return this.userRepository.find();
    }

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({ login: login });
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async createUser(user: CreateUserDto) {
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async updateUser(login: string, user: UpdateUserDto) {
        await this.userRepository.update(login, user);
        const updatedUser = await this.userRepository.findOne(login);
        if (updatedUser) {
            return updatedUser
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteUser(login: string) {
        const deleteResponse = await this.userRepository.delete(login);
        if (!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    async addFriend(login: string, friend: string) {
        // WIP
    }

    async removeFriend(login: string, friend: string) {
        // WIP
    }

    //WIP might be deleted
    async createtest(userData: CreateUserDtoTest) {
        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
}