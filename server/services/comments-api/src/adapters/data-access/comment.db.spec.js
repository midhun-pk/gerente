import { expect } from 'chai';
import makeDb, { client } from '../../utils/fixtures/db';
import makeCommentsDb from './comment-db';
import makeFakeComment from '../../utils/fixtures/comment';

describe('comments db', () => {
    let commentsDb;

    before(async () => {
        await makeDb();
    });

    beforeEach(() => {
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

    after(async () => {
        const db = await makeDb();
        await db.dropDatabase();
        await client.close();
    });
});
