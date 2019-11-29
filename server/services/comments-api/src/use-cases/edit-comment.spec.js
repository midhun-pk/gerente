import  { expect } from 'chai';
import makeCommentsDb from '../adapters/data-access/comment-db';
import makeDb from '../../test/db';
import makeFakeComment from '../utils/fixtures/comment';
import makeEditComment from './edit-comment';

describe('edit comment', () => {
    let commentsDb;

    before(() => {
        commentsDb = makeCommentsDb({ makeDb });
    });

    it('must include an id', async () => {
        const editComment = makeEditComment({ commentsDb });
        const comment = makeFakeComment({ id: undefined });
        return expect(await editComment(comment)).to.throw('You must supply an id.');
    });
});