import { Model, DataTypes } from 'sequelize';
import db from '../db/mysql';

class ASKs extends Model {
    id: number;
    nickname: string; //操作人
    aeskey: string; //
}
ASKs.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        aeskey: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: '密钥',
        },
        nickname: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: '创建人',
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: 't_patch_aeskeys',
    }
);
export default {
    sync(force = false) {
        return ASKs.sync({ force });
    },
    insert: function (model: any) {
        return ASKs.create(model);
    },
    async get() {
        const res = (await ASKs.findAll({ order: [['id', 'DESC']], limit: 1 })) || [];
        return res[0];
    },
};
