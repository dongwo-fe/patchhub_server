import { Model, DataTypes } from 'sequelize';
import db from '../db/mysql';

interface PatchAttr {}
class Patchs extends Model implements PatchAttr {
    id: number;
    appid: string;
    title: string;
    bundleid: string;
    version: string;
    app_count: number;
    patch_size: number;
    rule: number;
    release_time: number;
    remark: string;
    encryption: string;
    nickname: string;
    state: number;
    encrypt: number;
    content: string;
}
Patchs.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: '名称',
        },
        appid: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            comment: '应用id',
        },
        bundleid: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            comment: 'bundleid',
        },
        version: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            comment: '版本',
        },
        app_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: '激活数',
        },
        patch_size: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: '补丁大小',
        },
        rule: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            comment: '规则，0开发，1全量',
        },
        encrypt: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            comment: '是否加密,0没有，1加密',
        },
        release_time: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            comment: '发布时间',
        },
        encryption: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            comment: '加密：0后端加密，1aes加密',
        },
        remark: {
            type: DataTypes.TEXT,
            comment: '备注',
        },
        state: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            comment: '状态,1下发中，-1已撤回',
        },
        content: {
            type: DataTypes.TEXT,
            comment: '上传的内容',
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
        tableName: 't_patch_patchs',
    }
);
export default {
    sync(force = false) {
        return Patchs.sync({ force });
    },
    insert: function (model: any) {
        return Patchs.create(model);
    },
    getOne(id: number) {
        return Patchs.findOne({ where: { id } });
    },

    getlist(pageindex: number, data: IListOpts = {}) {
        let opts: any = {};
        if (data.appid) {
            opts.appid = data.appid;
        }
        return Patchs.findAndCountAll({
            where: opts,
            order: [['id', 'desc']],
            limit: 20,
            offset: (pageindex - 1) * 20,
        });
    },
    checkOne(appid, version, bundleid, rule) {
        return Patchs.findOne({
            where: {
                appid,
                version,
                bundleid,
                rule,
                state: 1,
            },
        });
    },
    update(id, data) {
        return Patchs.update(data, { where: { id } });
    },
    del(id) {
        return Patchs.destroy({ where: { id } });
    },
};
interface IListOpts {
    appid?: string;
}
