import AppModel from '../model/apps';
import { generateRandomString } from '../util/index';
// 获取应用列表
export async function GetApplicationList(pageindex, pagesize) {
    if (pageindex) pageindex = pageindex * 1;
    if (pagesize) pagesize = pagesize * 1;
    const data = await AppModel.getlist(pageindex, pagesize);
    return data;
}

// 获取全部应用
export async function GetApplicationAll() {
    const data = await AppModel.getAll();
    return data;
}
// 新增应用
export async function AddApplication(nickname: string, data) {
    const appid = generateRandomString(10);
    const app = await AppModel.insert({
        appid,
        title: data.title,
        bundleid: data.bundleid,
        remark: data.remark,
        key: data.key,
        nickname,
        state: 1, //
    });
    return app;
}
// 编辑应用
export async function EditApplication(nickname: string, id: number, data) {
    const app = await AppModel.update(id, {
        title: data.title,
        bundleid: data.bundleid,
        remark: data.remark,
        key: data.key,
        nickname,
    });
    return app;
}

// 1.1逻辑删除
export async function DelApplication(id: number) {
    const app = await AppModel.update(id, { state: -1 });
    return app;
}
