import {Column, DataType, Model, Table} from 'sequelize-typescript';


@Table({tableName: 'users'})
export class User extends Model {
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    email: string;

    @Column
    passHash: string
}
