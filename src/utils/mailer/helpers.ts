import fs from 'fs';
import util from 'util'; 

export const objectMap = (obj, fn) => {
    return Object.keys(obj).reduce((_obj, k) => {
        _obj.push(fn(k, obj[k]));
        return _obj;
    }, []);
}

export const base64Encode = async (file) => {
    const readFile = util.promisify(fs.readFile);
    const asset = await readFile(file);
    return Buffer.from(asset).toString('base64');
}

export const toInlineCss = (styles) =>
    objectMap(styles, (k, v) => `${k}: ${v}`).join(';');