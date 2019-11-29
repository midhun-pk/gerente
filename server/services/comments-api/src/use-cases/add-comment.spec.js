import { expect } from 'chai';
import makeCommentsDb from '../adapters/data-access/comment-db';
import makeFakeComment from '../utils/fixtures/comment';
import makeAddComment from './add-comment';
import makeDb from '../../test/db';


describe('add comment', () => {
    let commentsDb;

    before(() => {
        commentsDb = makeCommentsDb({ makeDb });
    });

    it('inserts comments in the database', async () => {
        const newComment = makeFakeComment();
        const addComment = makeAddComment({ commentsDb });
        const inserted = await addComment(newComment);
        expect(inserted).to.eql(newComment);
    });

    it('is idempotent', async () => {
        const newComment = makeFakeComment();
        const addComment = makeAddComment({ commentsDb });
        const insertOne = await addComment(newComment);
        const insertTwo = await addComment(newComment);
        expect(insertOne.id).not.to.be.undefined;
        expect(insertOne.id).to.equal(insertTwo.id);
    });

});