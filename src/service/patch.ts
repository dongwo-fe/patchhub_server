// 补丁管理
import PatchModel from '../model/patch';
import { UpdateCache } from './mangofix';

// 获取补丁列表
export async function GetPatchList(pageindex, data) {
    const list = await PatchModel.getlist(pageindex, data); // 搜索条件
    return list;
}
// 新增应用
export async function AddPatch(username, data) {
    const patch = await PatchModel.insert({
        title: data.appname,
        appid: data.appid,
        bundleid: data.bundleid,
        version: data.version,
        app_count: 0, // 激活数
        patch_size: data.size,
        rule: data.rule,
        release_time: new Date().getTime(), //todo
        encryption: data.encryption,
        remark: data.remark,
        state: 1, //todo
        content: data.patchdata,
        nickname: username,
    });
    return patch;
}
// 编辑应用
export async function EditPatch(username, id: number, data) {
    const patch = await PatchModel.update(id, {
        rule: data.rule,
        remark: data.remark,
        nickname: username,
    });
    UpdateCache(id);
    return patch;
}

// 撤回应用
export async function RetractPatch(id: number, username) {
    const app = await PatchModel.update(id, {
        state: -1,
        nickname: username,
    });
    return app;
}
