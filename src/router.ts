import Router from '@koa/router';

import test from './api/test';
import p_app from './api/p_app';
import patch from './api/patch';
import application from './api/application';
import ask from './api/ask';

const router = new Router();

// 接口
router.use('/api/test', test);

// 公开接口
router.use('/api_patch', p_app);

// 补丁管理的接口
router.use('/api/patch', patch);
// 应用管理模块
router.use('/api/application', application);
// ask
router.use('/api/config', ask);

export default router;
