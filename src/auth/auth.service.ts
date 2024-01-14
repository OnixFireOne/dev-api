import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './auth.model/auth.sequelize.model';
import {AuthDto} from './dto/auth.dto';
import {compare, genSalt, hash} from 'bcryptjs';
import {USER_NOTFOUND_ERROR, WRONG_PASSWORD_ERROR} from './auth.constants';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (@InjectModel(User) private readonly userModel: typeof User,
                 private readonly jwtService: JwtService
    ){}

    async createUser(dto: AuthDto) {
        const salt = await genSalt(10);
        const newUser = new this.userModel({
            email: dto.email,
            passHash: await hash(dto.password,salt)
        })

        return newUser.save();
    }

    async findUser(email: string):Promise<User | null> {
        return this.userModel.findOne({where:{email}})
    }

    async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
        const user = await this.findUser(email);
        if (!user){
            throw new UnauthorizedException(USER_NOTFOUND_ERROR)
        }

        const isCorrectPassword = await compare(password, user.passHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
        }

        return { email: user.email };
    }

    async login(email: string): Promise<object> {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }


}
