import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes, ValidationPipe
} from '@nestjs/common';
//import {CoinContentModel} from './coin-content.model/coin-content.model';
import {CoinContentService} from './coin-content.service';
import {CreateCoinContentDto} from './dto/create-coin-content.dto';
import {JwtAuthGuards} from '../auth/guards/jwt.guards';
import {UserEmailDecorator} from '../decorators/user-email.decorator';
//import {COIN_CONTENT_NOT_FOUND} from './coin-content.constants';
//import {CoinContent} from './coin-content.model/coin-content-sequelize.model';

@Controller('coin-content')
export class CoinContentController {
    constructor(private readonly coinContentService: CoinContentService) {}


    @Get(':idCoin')
    async get(@Param('idCoin') idCoin: string) {
        return this.coinContentService.findByIdCoin(idCoin);
    }


    @UseGuards(JwtAuthGuards)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto:CreateCoinContentDto, @UserEmailDecorator() email: string) {
        return this.coinContentService.create(dto);
    }

    @UseGuards(JwtAuthGuards)
    @Delete(':id')
    async delete(@Param('id') id: string){
       // const deletedDoc = await this.coinContentService.delete(id);
       // if(!deletedDoc) {
       //     throw new HttpException(COIN_CONTENT_NOT_FOUND, HttpStatus.NOT_FOUND)
       // }

        return this.coinContentService.delete(id)
    }

    // @Patch(':id')
    // async patch(@Param('id') id: string, @Body() dto: CoinContentModel){
    //     //return this.coinContentService.update(id,dto);
    // }
}
