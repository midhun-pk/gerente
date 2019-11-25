import { expect } from 'chai';
import makeRemoveComment from './remove-comment';
import makeCommentsDb from '../adapters/data-access/comment-db';
import makeDb from '../../test/db';
import makeFakeComment from '../utils/fixtures/comment';

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
});