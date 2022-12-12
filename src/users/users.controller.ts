import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger/dist/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOkResponse({ type: User, isArray: true })
	@ApiQuery({ name: 'name', required: false })
    @Get()
    getAll(@Query('username') username?: string): Promise<User[]> {
        return this.usersService.findAll(username);
    }

	@ApiOkResponse()
	@ApiNotFoundResponse()
	@Get(':id')
	getUserById(@Param('id', ParseIntPipe) id:number): Promise<User> {
		return this.usersService.findById(id)
	}

	@ApiOkResponse()
	@ApiNotFoundResponse()
	@Get('/username/:username')
	getUserByEmailOrUsername(@Param('username') username:string): Promise<User> {
		return this.usersService.findbyEmailOrUsername(username)
	}

	@ApiCreatedResponse({ type: User })
	@Post()
	createUser(@Body() body: CreateUserDto): Promise<User> {
		return this.usersService.createUser(body);
	}

	@ApiOkResponse()
	@ApiNotFoundResponse()
	@Patch('/:id') 
	updateUserWithId(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<void> {
		return this.usersService.updateUser(id, body);
	}
}
