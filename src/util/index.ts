import crypto from 'crypto';
import { nanoid } from 'nanoid';

export function EncodeAes128(text: string, key: string) {
    if (key.length !== 16) return '加密失败';
    const cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    const buff = cipher.update(text, 'utf8');
    const buff2 = cipher.final();
    const decoded = Buffer.concat([buff, buff2]);
    return decoded;
    // fs.writeFileSync(path.join(__dirname, './test.mg'), decoded, { encoding: 'binary' });
}
export function DecodeAes128(base64Str: string, key: string) {
    const cipher = crypto.createDecipheriv('aes-128-ecb', key, '');
    let decoded = cipher.update(base64Str, 'base64', 'utf8');
    decoded += cipher.final('utf8');
    return decoded;
}
// 随机内容
export function generateRandomString(length = 5) {
    return nanoid(length);
}
