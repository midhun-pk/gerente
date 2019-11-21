import { expect } from 'chai';
import makeCommentsDb from './comment-db';
import makeFakeComment from '../../utils/fixtures/comment';
import makeDb from '../../../test/db';

describe('comments db', () => {
    let commentsDb;

    before(() => {
        commentsDb = makeCommentsDb({ makeDb });
    });

    it('lists comments', async () => {
        const inserts = await Promise.all(
            [ makeFakeComment(), makeFakeComment(), makeFakeComment() ].map(
                commentsDb.insert
            )
        );
        const commentsFound = await commentsDb.findAll();
        expect(inserts.length).to.equal(3);
        inserts.forEach(insert =>
            expect(commentsFound).to.deep.include(insert)
        );
    });

    it('finds a comment by id', async () => {
        const comment = makeFakeComment();
        let found = await commentsDb.findById(comment);
        expect(found).to.be.null;
        await commentsDb.insert(comment);
        found = await commentsDb.findById(comment);
        expect(found).to.eql(comment);
    });

    it('finds a comment by hash', async () => {
        const comment = makeFakeComment();
        let found = await commentsDb.findByHash(comment);
        expect(found).to.be.null;
        await commentsDb.insert(comment);
        found = await commentsDb.findByHash(comment);
        expect(found).to.eql(comment);
    });

    it('finds all comments for a post', async () => {
        const johnsCommentOnPostA = makeFakeComment({ replyToId: null });
        const johnsCommentOnPostB = makeFakeComment({ replyToId: null });
        const marysCommentOnPostA = makeFakeComment({ replyToId: null, postId: johnsCommentOnPostA.postId });
        const janesCommentOnPostA = makeFakeComment({ replyToId: null, postId: johnsCommentOnPostA.postId });
        const janesReplyToMarysCommentOnPostA = makeFakeComment({ replyToId: marysCommentOnPostA.id, postId: johnsCommentOnPostA.postId });
        const commentsOnPostA = [ johnsCommentOnPostA, marysCommentOnPostA, janesCommentOnPostA, janesReplyToMarysCommentOnPostA ];
        await Promise.all(
            [ ...commentsOnPostA, johnsCommentOnPostB ].map(
                commentsDb.insert
            )
        );
        let commentsFound = await commentsDb.findByPostId({ postId: johnsCommentOnPostA.postId, omitReplies: false });
        commentsOnPostA.forEach(comment =>
            expect(commentsFound).to.deep.include(comment)
        );
        commentsOnPostA.pop();
        commentsFound = await commentsDb.findByPostId({ postId: johnsCommentOnPostA.postId });
        commentsOnPostA.forEach(comment =>
            expect(commentsFound).to.deep.include(comment)
        );
    });

    it('finds all replies for a comment', async () => {
        const johnsCommentOnPostA = makeFakeComment({ replyToId: null });
        const franksReplyToJohnsCommentOnPostA = makeFakeComment({ replyToId: johnsCommentOnPostA.id, postId: johnsCommentOnPostA.postId, published: false });
        const marysReplyToJohnsCommentOnPostA = makeFakeComment({ replyToId: johnsCommentOnPostA.id, postId: johnsCommentOnPostA.postId });
        const janesReplyToJohnsCommentOnPostA = makeFakeComment({ replyToId: johnsCommentOnPostA.id, postId: johnsCommentOnPostA.postId });
        const dannysReplyToMarysReplyOnPostA = makeFakeComment({ replyToId: marysReplyToJohnsCommentOnPostA.id, postId: johnsCommentOnPostA.postId });
        await Promise.all(
            [ johnsCommentOnPostA,
                marysReplyToJohnsCommentOnPostA,
                janesReplyToJohnsCommentOnPostA,
                dannysReplyToMarysReplyOnPostA,
                franksReplyToJohnsCommentOnPostA
            ].map(
                commentsDb.insert
            )
        );
        const publishedCommentsFound = await commentsDb.findReplies({ commentId: johnsCommentOnPostA.id });
        expect(publishedCommentsFound.length).to.equal(2);
        [ marysReplyToJohnsCommentOnPostA, janesReplyToJohnsCommentOnPostA ].forEach(comment =>
            expect(publishedCommentsFound).to.deep.include(comment)
        );
        const commentsFound = await commentsDb.findReplies({ commentId: johnsCommentOnPostA.id, publishedOnly: false });
        expect(commentsFound.length).to.equal(3);
        [ franksReplyToJohnsCommentOnPostA, marysReplyToJohnsCommentOnPostA, janesReplyToJohnsCommentOnPostA ].forEach(comment =>
            expect(commentsFound).to.deep.include(comment)
        );
    });

    it('inserts a comment', async () => {
        const comment = makeFakeComment();
        const result = await commentsDb.insert(comment);
        expect(result).to.eql(comment);
    });

    it('updates a comment', async () => {
        const comment = makeFakeComment();
        let result = await commentsDb.update(comment);
        expect(result).to.be.null;
        await commentsDb.insert(comment);
        comment.text = 'changed';
        result = await commentsDb.update(comment);
        expect(result).to.eql(comment);
    });

    it('deletes a comment', async () => {
        const comment = makeFakeComment();
        let result = await commentsDb.remove(comment);
        expect(result).to.eql(0);
        await commentsDb.insert(comment);
        result = await commentsDb.remove(comment);
        expect(result).to.eql(1);
    });

});
