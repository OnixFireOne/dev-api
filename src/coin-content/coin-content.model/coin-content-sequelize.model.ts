import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface CoinContentAttrs {
    idCoin: string,
    symbol: string,
    data: string
}

@Table({tableName: 'coin_contents'})
export class CoinContent extends Model {
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    idCoin: string

    @Column( {type: DataType.STRING, unique: true, allowNull: false})
    symbol: string

    @Column(DataType.TEXT)
    data: string
}
