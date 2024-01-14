import {CoinContent} from '../coin-content.model/coin-content.model';
import {IsString} from 'class-validator';

export class CreateCoinContentDto{
    @IsString()
    idCoin: string

    @IsString()
    symbol: string


    data: CoinContent[] | string
}
