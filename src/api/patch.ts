import Router, { RouterContext } from '@koa/router';
import { BeError, BeSuccess } from '../util/response';
import { AddPatch, EditPatch, GetPatchList, RetractPatch } from '../service/patch';
import { Auth } from '../middleware/auth';

const router = new Router<RouterContext>();

// 补丁列表查询
router.get('/list', Auth, async function (ctx) {
    const { pageindex = 1 } = ctx.request.query;
    try {
        const data = await GetPatchList(pageindex, ctx.query);
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});
// 补丁新增
router.post('/add', Auth, async function (ctx) {
    const { appid, appname, bundleid, version, size, encryption, patchdata } = ctx.request.body;

    try {
        if (!appid) throw new Error('应用id不存在');
        if (!appname) throw new Error('应用名称不存在');
        if (!bundleid) throw new Error('bundleid数据不存在');
        if (!version) throw new Error('version数据不存在');
        if (!(size > 0)) throw new Error('size数据不合规范');
        // if (![0, 1].includes(rule)) throw new Error('rule不合规范');
        const username = ctx.user.userName;

        if (!['0', '1'].includes(encryption)) throw new Error('encryption不合规范');
        if (!patchdata) throw new Error('patchdata数据不存在');
        const data = await AddPatch(username as string, ctx.request.body);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});
// 补丁编辑
router.post('/edit', Auth, async function (ctx) {
    const { id } = ctx.request.body;

    try {
        if (!id) throw new Error('不存在的数据');
        const username = ctx.user.userName;

        // if (![0, 1].includes(data.rule)) throw new Error('rule不合规范');
        const data = await EditPatch(username, id, ctx.request.body);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});
// 补丁撤回
router.post('/retract', Auth, async function (ctx) {
    const { id } = ctx.request.body;

    try {
        const username = ctx.user.userName;
        if (!id) throw new Error('不存在的数据');
        const data = await RetractPatch(id, username);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});
export default router.routes();
