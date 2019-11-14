import crypto from 'crypto';
import sanitizeHTML from 'sanitize-html';
import ipRegex from 'ip-regex';
import Id from '../utils/Id'
import commentFactory from './comment.entity';
import sourceFactory from './source.entity';

const md5 = (text) => {
    return crypto.createHash('md5').update(text, 'utf-8').digest('hex');
};

const sanitize = (text) => {
    return sanitizeHTML(text);
}

const isValidIp = (ip) => {
    return ipRegex({ exact: true }).test(ip);
};

const makeSource = sourceFactory({isValidIp});

const makeComment = commentFactory({Id, md5, sanitize, makeSource});

export default makeComment;