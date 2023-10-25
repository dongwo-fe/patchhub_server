import Router, { RouterContext } from '@koa/router';
import { BeError } from '../util/response';
import { checkmangofile, getMangFile } from '../service/mangofix';
import fs from 'fs';
import Path from 'path';

const ROOTPATH = process.cwd();
const router = new Router<RouterContext>();

// 检查是否有更新
//userid=&debug=0&fileid=f4ead97f5bd2418e&encrypt=1&uuid=f1872ea7894242c6&version=2.2.7&bundleid=com.juran.cn.juranPro&appid=2e9c86fe8a3e4fee
router.post('/checkmangofile', async function (ctx) {
    const { userid, debug, fileid, encrypt, uuid, version, bundleid, appid } = ctx.request.body;
    try {
        if (!version) throw new Error('没有版本号');
        if (!bundleid) throw new Error('没有bundleid');
        if (!appid) throw new Error('不存在的应用');

        const data = await checkmangofile(uuid, appid, version, bundleid, fileid, debug);
        if (data) {
            ctx.body = {
                code: 200,
                rows: data,
                msg: '新补丁更新',
            };
        } else {
            ctx.body = {
                code: 202,
                rows: {},
            };
        }
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            rows: {},
            msg: error.message,
        };
    }
});

// 获取文件
//bundleid=com.juran.cn.juranPro&version=2.2.7&appid=2e9c86fe8a3e4fee&userid=&debug=0&encrypt=1
router.post('/getmangofile', async function (ctx) {
    const { version, bundleid, appid, debug } = ctx.request.body;
    try {
        if (!version) throw new Error('没有版本号');
        const data = await getMangFile(appid, version, bundleid, debug);
        ctx.set('Content-Disposition', 'form-data;name="attachment"; filename="demo.mg"');
        ctx.set('Access-Control-Expose-Headers', 'Content-Disposition');
        // ctx.set('content-type', 'application/octet-stream;chatset=utf-8');
        ctx.status = 201;
        ctx.body = data;
    } catch (error) {
        console.log(error);
        ctx.status = 502;
        ctx.body = BeError(error);
    }
});

router.get('/test', function (ctx) {
    ctx.body = ctx.cookies.get('test') || '';
});

export default router.routes();
