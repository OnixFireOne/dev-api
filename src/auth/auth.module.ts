import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {TypegooseModule} from '@m8a/nestjs-typegoose';
import {AuthModel} from './auth.model/auth.model';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './auth.model/auth.sequelize.model';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {getJWTConfig} from '../configs/jwt.config';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './stratagies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
      //***Mongo
      // TypegooseModule.forFeature([
      //   {
      //     typegooseClass: AuthModel,
      //     schemaOptions: {
      //       collection: 'Auth'
      //     }
      //   }
      // ])
      SequelizeModule.forFeature([User]),
      ConfigModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getJWTConfig
      }),
      PassportModule
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
