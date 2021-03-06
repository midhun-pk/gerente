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

    it('must include an id', () => {
        const editComment = makeEditComment({ commentsDb });
        const comment = makeFakeComment({ id: undefined });
        return expect(editComment(comment)).rejectedWith('You must supply an id.');
    });

    it('must include a text', () => {
        const editComment = makeEditComment({ commentsDb });
        const comment = makeFakeComment({ text: undefined });
        return expect(editComment(comment)).rejectedWith('You must supply a text.');
    });

    it('must not upsert a comment', () => {
        const editComment = makeEditComment({ commentsDb });
        const comment = makeFakeComment();
        return expect(editComment(comment)).rejectedWith('Comment not found.');
    });

    it('modifies a comment', async () => {
        const editComment = makeEditComment({ commentsDb });
        const comment = makeFakeComment();
        const inserted = await commentsDb.insert(comment);
        const edited = await editComment({ ...comment, text: 'changed' });
        expect(edited.text).to.be.string('changed');
        expect(inserted.modifiedOn).to.not.eql(edited.modifiedOn);
        expect(edited.hash).not.to.be.undefined;
        expect(inserted.hash).to.not.eql(edited.hash);
    });
});