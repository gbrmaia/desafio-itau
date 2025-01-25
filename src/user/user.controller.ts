import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuario' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  @Post('/update/:cpf')
  @ApiOperation({ summary: 'Atualiza um usuario por cpf' })
  @ApiParam({
    name: 'cpf',
    type: String,
    required: true,
    description: 'O cpf do usuario',
  })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('cpf') cpf: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(cpf, updateUserDto);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  @Get('/find/:cpf')
  @ApiOperation({ summary: 'Busca um usuario por cpf' })
  @ApiParam({
    name: 'cpf',
    type: String,
    required: true,
    description: 'O cpf do usuario',
  })
  findByCpf(@Param('cpf') cpf: string) {
    try {
      return this.userService.findOne(cpf);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  @Post('/deleteByCpf')
  @ApiOperation({ summary: 'Deleta um usuario por cpf' })
  @ApiBody({
    description: 'Cpf do usuario a ser deletado',
    schema: { type: 'object', properties: { cpf: { type: 'string' } } },
  })
  removeByCpf(@Body('cpf') cpf: string) {
    try {
      return this.userService.removeByCpf(cpf);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
