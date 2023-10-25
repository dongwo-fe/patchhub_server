import { LRUCache } from 'lru-cache';

//10秒的缓存
const Cache = new LRUCache({
    ttl: 1000 * 60,
    ttlAutopurge: false,
});

export async function CheckUserToken(token: string) {
    Cache.set(token, '123456');
}
