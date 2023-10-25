// 全局配置处理
import ASKModal from '../model/asks';

// 获取ask
export async function GetGlobalData() {
    const data = (await ASKModal.get()) || [];
    return data;
}
// 添加ask
export async function AddGlobalData(userName, data) {
    const global = await ASKModal.insert({
        aeskey: data.aeskey,
        nickname: userName,
    });
    return global;
}
