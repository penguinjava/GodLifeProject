import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from "@/entities/users.entity";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Tokens } from "@/entities/tokens.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Users, Tokens])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
