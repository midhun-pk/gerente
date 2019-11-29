import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import makeCommentsDb from '../adapters/data-access/comment-db';
import makeDb from '../../test/db';
import makeFakeComment from '../utils/fixtures/comment';
import makeEditComment from './edit-comment';

chai.use(chaiAsPromised);

describe('edit comment', () => {
    let commentsDb;

    before(() => {
        commentsDb = makeCommentsDb({ makeDb });
    });

    it('must include an id', async () => {
        const editComment = makeEditComment({ commentsDb });
        const comment = makeFakeComment({ id: undefined });
        return expect(editComment(comment)).to.be.rejectedWith('You must supply an id.');
    });
});