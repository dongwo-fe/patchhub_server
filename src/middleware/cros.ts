import Router from '@koa/router';
import Koa from 'koa';

/**
 * 跨域
 */
export default async function (ctx: Router.RouterContext, next: Koa.Next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
}
