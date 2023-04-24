import {
  Controller,
  ParseIntPipe,
  Post,
  Put,
  Get,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }
  @Post()
  async create(@Body() dto: UserDto) {
    return await this.userService.create(dto);
  }
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UserDto) {
    return await this.userService.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
