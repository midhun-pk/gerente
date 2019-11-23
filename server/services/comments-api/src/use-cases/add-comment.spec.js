import { expect } from 'chai';
import makeCommentsDb from '../adapters/data-access/comment-db';
import makeFakeComment from '../utils/fixtures/comment';
import makeAddComment from './add-comment';
import makeDb from '../../test/db';


describe('Add comment', () => {
    let commentsDb;

    before(async () => {
        commentsDb = makeCommentsDb({ makeDb });
    });

    it('inserts comments in the database', async () => {
        const newComment = makeFakeComment();
        const addComment = makeAddComment({ commentsDb });
        const inserted = await addComment(newComment);
        expect(inserted).to.eql(newComment);
    });

});