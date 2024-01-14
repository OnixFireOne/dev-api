import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
//import {InjectModel} from '@m8a/nestjs-typegoose';
//import {BeAnyObject, DocumentType, ModelType} from '@typegoose/typegoose/lib/types';
import {CreateCoinContentDto} from './dto/create-coin-content.dto';
//import {CoinContentModel} from './coin-content.model/coin-content.model';
import {CoinContent} from './coin-content.model/coin-content-sequelize.model';
import {COIN_CONTENT_NOT_FOUND} from './coin-content.constants';
import {InjectModel} from '@nestjs/sequelize';

@Injectable()
export class CoinContentService {

    // -__- Mongo
    // constructor(@InjectModel(CoinContentModel) private readonly coinContentModel: ModelType<CoinContentModel>) {}
    //
    //
    // async create(dto: CreateCoinContentDto): Promise<DocumentType<CoinContentModel>> {
    //     return this.coinContentModel.create(dto);
    // }
    //
    // async update(id: string, dto: CoinContentModel) {
    //     return this.coinContentModel.findByIdAndUpdate(id, dto).exec()
    // }
    //
    // async delete(id: string): Promise<DocumentType<CoinContentModel> | BeAnyObject> {
    //     return this.coinContentModel.findByIdAndDelete(id).exec()
    // }
    //
    // async findByIdCoin(idCoin: string): Promise<DocumentType<CoinContentModel> | null>{
    //     return this.coinContentModel.findOne({idCoin:idCoin}).exec()
    // }

    constructor(@InjectModel(CoinContent) private readonly coinContentSModel: typeof CoinContent) {}

    async create(dto: CreateCoinContentDto): Promise<CoinContent> {

        dto.data = (typeof dto.data === 'string')? dto.data : JSON.stringify(dto.data);
        console.log(dto);
        return await this.coinContentSModel.create({...dto})
    }

    async delete(idCoin: string): Promise<void> {
        const content = await this.coinContentSModel.findOne({where: {idCoin}});
        if(content){
            await content.destroy();
            return;
        }
        throw new HttpException(COIN_CONTENT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    async findByIdCoin(idCoin: string): Promise<CoinContent | null> {
        return this.coinContentSModel.findOne({where: {idCoin}});
    }


}
