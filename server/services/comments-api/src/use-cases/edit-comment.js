import makeComment from '../entities';

const makeEditComment = ({ commentsDb }) => {
    const editComment = async ({ id, ...changes }) => {
        if (!id) {
            throw new Error('You must supply an id.');
        }
        if (!changes.text) {
            throw new Error('You must supply a text.');
        }
        const existing = await commentsDb.findById({ id });
        if (!existing) {
            throw new RangeError('Comment not found.');
        }
        const comment = makeComment({ ...existing, ...changes, modifiedOn: Date.now() });
        if (comment.getHash() === existing.hash) {
            return existing;
        }
        const updated = await commentsDb.update(comment);
        return { ...existing, ...updated };
    };

    return editComment;
};

export default makeEditComment;