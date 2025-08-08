import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    // 1. Check if user exists
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save to DB
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return { message: 'User created successfully', id: user._id };
  }

   // QUERY Example
  async findByAgeRange(min: number, max: number) {
    return this.userModel.find({ age: { $gte: min, $lte: max } });
  }

  // PARAM Example
  async findById(id: string) {
    return this.userModel.findById(id);
  }

  // BODY Example
  async createUser(data: { name: string; email: string; age: number }) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  // Aggregation Example
  async getUsersWithStats(minAge: number) {
    return this.userModel.aggregate([
      { $match: { age: { $gte: minAge } } },
      {
        $group: {
          _id: null,
          avgAge: { $avg: "$age" },
          total: { $sum: 1 }
        }
      }
    ]);
  }
}
