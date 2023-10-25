import Router, { RouterContext } from '@koa/router';
import { BeError, BeSuccess } from '../util/response';
import { AddApplication, EditApplication, GetApplicationList, DelApplication, GetApplicationAll } from '../service/application';
import { Auth } from '../middleware/auth';

const router = new Router<RouterContext>();

// 获取应用列表
router.get('/list', Auth, async function (ctx) {
    const { pageindex = 1, pagesize } = ctx.request.query;
    try {
        const data = await GetApplicationList(pageindex, pagesize);
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});

router.get('/all', Auth, async function (ctx) {
    try {
        const data = await GetApplicationAll();
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});
//添加 应用
router.post('/add', Auth, async function (ctx) {
    const username = ctx.user.userName;
    const { title, bundleid, key } = ctx.request.body;

    try {
        if (!title) throw new Error('应用名称不存在');
        if (!bundleid) throw new Error('bundleid数据不存在');
        if (key.length !== 16) throw new Error('密码长度不是16位');
        const data = await AddApplication(username as string, ctx.request.body);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});

// 编辑应用
router.post('/edit', Auth, async function (ctx) {
    const { id, key, bundleid, title } = ctx.request.body;
    const username = ctx.user.userName;

    try {
        if (!id) throw new Error('数据不存在');
        if (key.length !== 16) throw new Error('密码长度不是16位');
        if (!bundleid) throw new Error('bundleid数据不存在');
        if (!title) throw new Error('应用名称不存在');
        const data = await EditApplication(username as string, id, ctx.request.body);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});

// 删除应用 逻辑删除state = -1
router.post('/del', Auth, async function (ctx) {
    const { id } = ctx.request.body;

    try {
        if (!id) throw new Error('数据不存在');
        const data = await DelApplication(id);
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});
export default router.routes();
