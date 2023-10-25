import Router, { RouterContext } from '@koa/router';
import { BeError, BeSuccess } from '../util/response';
import { GetGlobalData, AddGlobalData } from '../service/ask';
import { Auth } from '../middleware/auth';
const router = new Router<RouterContext>();
// 全局配置

// 获取全局配置
router.get('/setting', Auth, async function (ctx) {
    try {
        const data = await GetGlobalData();
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});
// 增加ask
router.post('/setting', Auth, async function (ctx) {
    const { aeskey } = ctx.request.body;
    try {
        if (aeskey.length !== 16) throw new Error('密码长度不是16位');
        const username = ctx.user.userName;
        const data = await AddGlobalData(username, ctx.request.body);
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});
export default router.routes();
