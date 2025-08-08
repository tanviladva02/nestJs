import { Controller, Post, Body,Get, Query, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }

   // QUERY example => GET /users/by-age?min=20&max=30
  @Get('by-age')
  getByAge(@Query('min') min: string, @Query('max') max: string) {
    return this.usersService.findByAgeRange(Number(min), Number(max));
  }

  // PARAM example => GET /users/123
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // BODY example => POST /users
  @Post()
  create(@Body() body: { name: string; email: string; age: number }) {
    return this.usersService.createUser(body);
  }

  // AGGREGATION example => GET /users/stats?minAge=18
  @Get('stats')
  getStats(@Query('minAge') minAge: string) {
    return this.usersService.getUsersWithStats(Number(minAge));
  }

}
