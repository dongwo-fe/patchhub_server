import Router, { RouterContext } from '@koa/router';
import { BeError, BeSuccess } from '../util/response';

const router = new Router<RouterContext>();

router.get('/', async function (ctx) {
    try {
        ctx.body = BeSuccess();
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});

export default router.routes();
