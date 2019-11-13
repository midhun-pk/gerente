import crypto from 'crypto';
import sanitizeHTML from 'sanitize-html';
import Id from '../../utils/Id'
import commentFactory from './comment.entity';

const makeComment = commentFactory.makeComment({Id, md5, sanitize});

const md5 = (text) => {
    return crypto.createHash('md5').update(text, 'utf-8').digest('hex');
};

const sanitize = () => {
    return sanitizeHTML(text);
}

export default makeComment;