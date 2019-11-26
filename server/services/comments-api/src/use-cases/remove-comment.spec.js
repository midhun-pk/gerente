import { expect } from 'chai';
import makeRemoveComment from './remove-comment';
import makeCommentsDb from '../adapters/data-access/comment-db';
import makeDb from '../../test/db';
import makeFakeComment from '../utils/fixtures/comment';
import makeComment from '../entities';

describe('remove comment', () => {
    let commentsDb;

    before(() => {
        commentsDb = makeCommentsDb({ makeDb });
    });

    it('handles non existant comment', async () => {
        const removeComment = makeRemoveComment({ commentsDb });
        const fakeComment = makeFakeComment();
        const expected = {
            deletedCount: 0,
            softDelete: false,
            message: 'Comment not found, nothing to delete.'
        };
        const actual = await removeComment(fakeComment);
        expect(actual).to.eql(expected);
    });

    it('hard deletes comments with zero replies', async () => {
        const removeComment = makeRemoveComment({
            commentsDb
        });
        const fakeComment = makeFakeComment();
        await commentsDb.insert(fakeComment);
        const found = await commentsDb.findById(fakeComment);
        expect(found).to.eql(fakeComment);
        const expected = {
            deletedCount: 1,
            softDelete: false,
            message: 'Comment deleted.'
        };
        const actual = await removeComment(fakeComment);
        expect(actual).to.eql(expected);
        const notFound = await commentsDb.findById(fakeComment);
        expect(notFound).to.be.null;
    });

    it('soft deletes comments with 1 or more replies', async () => {
        const removeComment = makeRemoveComment({
            commentsDb
        });
        const fakeComment = makeFakeComment();
        await commentsDb.insert(fakeComment);
        const fakeCommentReply = makeFakeComment({
            replyToId: fakeComment.id
        });
        await commentsDb.insert(fakeCommentReply);
        const expected = {
            deletedCount: 1,
            softDelete: true,
            message: 'Comment has replies. Soft deleted.'
        };
        const actual = await removeComment(fakeComment);
        expect(actual).to.eql(expected);
        const deleted = await commentsDb.findById(fakeComment);
        expect(makeComment(deleted).isDeleted()).to.be.true;
        await commentsDb.remove(fakeComment);
        await commentsDb.remove(fakeCommentReply);
    });

    it('hard deletes a comment and its deleted parent when there are no other replies', async () => {
        const removeComment = makeRemoveComment({
            commentsDb
        });
        const fakeComment = makeFakeComment();
        const fakeReply = makeFakeComment({
            replyToId: fakeComment.id,
            postId: fakeComment.postId,
            published: true
        });
        const [ insertedParent, insertedReply ] = await Promise.all([
            commentsDb.insert(fakeComment),
            commentsDb.insert(fakeReply)
        ]);
        const parentDelete = await removeComment(insertedParent);
        expect(parentDelete.softDelete).to.be.true;
        const expected = {
            deletedCount: 2,
            softDelete: false,
            message: 'Comment and parent deleted.'
        };
        const actual = await removeComment(insertedReply);
        expect(actual).to.eql(expected);
        await commentsDb.remove(fakeReply);
        await commentsDb.remove(fakeComment);
    });
});