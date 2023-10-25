/**
 * 默认的配置
 */
module.exports = {
    //开发环境数据库
    db: {
        host: '127.0.0.1',
        port: 3306,
        database: 'patchhub',
        user: 'patchhub',
        password: 'patchhub',
        connectionLimit: 2,
    },
    //开发环境，普通redis配置
    redis: {
        host: '127.0.0.1',
        password: '123456abc',
        port: 3307,
    }
};
