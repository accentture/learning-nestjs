import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column({ allowNull: false })
    names: string;

    @Column({ allowNull: false })
    surnames: string;

    @Column({ allowNull: false })
    age: number;

}
