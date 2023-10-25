import { Model, DataTypes } from 'sequelize';
import db from '../db/mysql';

class Apps extends Model {
    id: number;
    appid: string;
    title: string; //名称
    bundleid: string; //bundleid
    remark: string; //备注
    nickname: string; //操作人
    key: string; //加密
    state: number;
}
Apps.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        appid: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: 'appid',
        },
        title: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: '名称',
        },
        key: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: '密钥',
        },
        bundleid: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            comment: 'bundleid',
        },
        remark: {
            type: DataTypes.TEXT,
            comment: '备注',
        },
        state: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            comment: '状态,1使用中，-1已删除',
        },
        nickname: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: '操作人',
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: 't_patch_apps',
    }
);
export default {
    sync(force = false) {
        return Apps.sync({ force });
    },
    insert: function (model: any) {
        return Apps.create(model);
    },
    // 获取所有应用 state = 1
    getlist(pageindex: number, pagesize: number) {
        let opts: any = { state: 1 };
        if (!pageindex) pageindex = 1;
        if (!pagesize) pagesize = 20;
        if (pagesize > 100) pagesize = 100;
        return Apps.findAndCountAll({
            where: opts,
            order: [['id', 'desc']],
            limit: pagesize,
            offset: (pageindex - 1) * pagesize,
        });
    },
    // 获取所有应用 state = 1
    getAll() {
        let opts: any = { state: 1 };
        return Apps.findAndCountAll({
            where: opts,
            order: [['id', 'desc']],
        });
    },
    getOne(appid) {
        return Apps.findOne({ where: { appid } });
    },
    update(id, data) {
        return Apps.update(data, { where: { id } });
    },
    del(appid) {
        return Apps.destroy({ where: { appid } });
    },
};
