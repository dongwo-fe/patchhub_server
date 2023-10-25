import patchModel from '../model/patch';
import { EncodeAes128 } from '../util';
import appsModel from '../model/apps';
import fs from 'fs';
import Path from 'path';
import { LRUCache } from 'lru-cache';

const Cache = new LRUCache({
    ttl: 1000 * 60,
    ttlAutopurge: false,
});

// "appid": "2e9c86fe8a3e4fee",
//"appname": null,
//"fileid": "f4ead97f5bd2418e",
//"version": "2.2.7",
//"createtime": 1693217875000,
//"remark": "修复flutter蜂窝的bug",
//"userid": 10065,
//"state": 0,
//"debug": 0,
//"devicenum": 0,
//"activenum": 15566,
//"autoencrypt": 1,
//"encrypt": 1,
//"size": 0.86

/**
 * 检查是否有更新
 * @param uuid 设备id
 * @param appid 应用id
 * @param version 版本号
 * @param bundleid 包名
 * @returns 内容
 */
export async function checkmangofile(uuid: string, appid: string, version: string, bundleid: string, id: number | string, debug: number | string = 0) {
    let rule = 0;
    if (debug || debug == 'true') {
        rule = 0;
    } else {
        rule = 1;
    }
    // 检查：是否需要更新补丁，查找下发中的补丁
    const data = await patchModel.checkOne(appid, version, bundleid, rule);
    if (data) {
        // 已经更新到最新了
        if (data.id === Number(id)) return null;
        // 跟进uuid记录激活设备数
        return {
            appid,
            appname: data.title,
            fileid: data.id,
            version,
            createtime: '',
            remark: '',
            userid: uuid,
            size: data.patch_size,
            encrypt: data.encrypt,
        };
    }

    // 检查：无补丁情况下，是否需要撤回
    if (Number(id) > 0) {
        const model = await patchModel.getOne(Number(id));
        if (model?.state === -1) {
            throw new Error('撤回');
        }
    }
    return null;
}

export async function getMangFile(appid: string, version: string, bundleid: string, debug: number | string) {
    if (Cache.has({ appid, version, bundleid, debug })) {
        return Cache.get({ appid, version, bundleid, debug });
    }
    let rule = 0;
    if (debug || debug == 'true') {
        rule = 0;
    } else {
        rule = 1;
    }
    const data = await patchModel.checkOne(appid, version, bundleid, rule);
    if (!data) throw new Error('没有补丁');
    const model = await appsModel.getOne(data.appid);
    if (!model) throw new Error('没有补丁');
    const res = EncodeAes128(data.content, model.key);
    Cache.set({ appid, version, bundleid, debug }, res);
    return res;
    // const text = fs.readFileSync(Path.join(process.cwd(), './demo.mg'), { encoding: 'utf8' });
    // return EncodeAes128(text, '2C85rbObk2EoDinV');
}

/**
 * 更新缓存中的内容
 * @param id id
 * @returns
 */
export async function UpdateCache(id: number) {
    const model = await patchModel.getOne(id);
    if (!model) return;
    const appid = model.appid;
    const data = await appsModel.getOne(appid);
    if (!data) throw new Error('没有补丁');
    const version = model.version;
    const bundleid = model.bundleid;
    const debug = model.rule;
    if (data.key.length !== 16) return;
    const res = EncodeAes128(model.content, data.key);
    Cache.set({ appid, version, bundleid, debug }, res);
}
