import ejs from 'ejs';
import mjml2html from 'mjml';
import util from 'util';
import fs from 'fs';
import { base64Encode, toInlineCss } from './helpers';

export class Mailer {
    private _data;
    private _path: string;
    private _attachments: { [key: string]: string }[];

    constructor(path: string, data = {}, attachments: { [key: string]: string }[] = [])  {
        this._path = path;
        this._data = data;
        this._attachments = attachments;
	}

    get path(): string { return this._path; }
    set path(newPath: string) { this._path = newPath; }

    get data(): Record<string, undefined> { return this._data; }
    set data(newData: Record<string, undefined>) { this._data = newData; }

    setKey(key: string, value: unknown) { this._data[key] = value; }
    removeKey(key: string) { delete this._data[key]; }

    get attachments(): { [key: string]: string }[] { return this._attachments; }
    set attachments(newAttachments: { [key: string]: string }[]) { this._attachments = newAttachments; }

    get attachmentsObject(): { [key: string]: string }[] {
        return this._attachments.reduce((obj, attachment) => {
            obj[attachment.cid] = attachment.path;
            return obj;
        }, []);
    }

    addAttachment(cid: string, path: string, contentDisposition: 'inline' | 'attachment' = 'inline') {
        this._attachments.push({ cid, path, contentDisposition });
    }
    removeAttachment(cid: string) {
        const index = this._attachments.findIndex(attachment => attachment.cid === cid);
        this._attachments.splice(index, 1);
    }

    async toHtmlString(locale?: string, options = {}) {
        const readFile = util.promisify(fs.readFile);
        const templateCode = (await readFile(this._path)).toString();

        const mjmlCode = ejs.render(templateCode, {
            ...options,
            locale,
            toInlineCss: toInlineCss,
            base64Encode: base64Encode,
            ...(this.attachmentsObject),
            ...this.data
        });

        return mjml2html(mjmlCode).html;
    }
}
