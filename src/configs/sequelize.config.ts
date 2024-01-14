import {ConfigService} from '@nestjs/config';
import {SequelizeModuleOptions} from '@nestjs/sequelize';
import {User} from '../auth/auth.model/auth.sequelize.model';
import {CoinContent} from '../coin-content/coin-content.model/coin-content-sequelize.model';


export const getSequelizeConfig = async (configService: ConfigService): Promise<SequelizeModuleOptions> => {
    return {
        ...getSequelizeOption(configService)
    }
    };

const getSequelizeOption = (configService: ConfigService): SequelizeModuleOptions => {

    return {
        dialect: configService.get('DIALECT'),
        host: configService.get('HOST'),
        port: configService.get('PORT'),
        username: configService.get('SQ_USER'),
        password: configService.get('PASS'),
        database: configService.get('DATABASE'),
        models: [User,CoinContent],
        autoLoadModels: true
    }
}
