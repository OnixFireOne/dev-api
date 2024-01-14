import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoinModule } from './coin/coin.module';
import { CoinContentModule } from './coin-content/coin-content.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypegooseModule} from '@m8a/nestjs-typegoose';
import {getMongoConfig} from './configs/mongo.config';
import {SequelizeModule} from '@nestjs/sequelize';
import {getSequelizeConfig} from './configs/sequelize.config';

@Module({
  imports: [
      ConfigModule.forRoot(),
      //**Mongo connection
      // TypegooseModule.forRootAsync({
      //     imports: [ConfigModule],
      //     inject: [ConfigService],
      //     useFactory: getMongoConfig
      // }),
      SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getSequelizeConfig
      }),
      AuthModule,
      CoinModule,
      CoinContentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
