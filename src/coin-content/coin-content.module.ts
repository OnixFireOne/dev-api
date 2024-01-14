import { Module } from '@nestjs/common';
import { CoinContentController } from './coin-content.controller';
//import {TypegooseModule} from '@m8a/nestjs-typegoose';
//import {CoinContentModel} from './coin-content.model/coin-content.model';
import { CoinContentService } from './coin-content.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {CoinContent} from './coin-content.model/coin-content-sequelize.model';

@Module({
  controllers: [CoinContentController],
  imports: [
    //**Mongo module
    // TypegooseModule.forFeature([
    //   {
    //     typegooseClass: CoinContentModel,
    //     schemaOptions: {
    //       collection: 'CoinContent'
    //     }
    //   }
    // ])
      SequelizeModule.forFeature([CoinContent])
  ],
  providers: [
      CoinContentService
  ]
})
export class CoinContentModule {}
