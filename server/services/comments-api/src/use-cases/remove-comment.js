import makeComment from '../entities';

const makeRemoveComment = ({ commentsDb }) => {
    const removeComment = async ({ id }) => {
        if (!id) {
            throw new Error('You must supply a comment id.');
        }

        const commentToDelete = await commentsDb.findById({ id });

        if (!commentToDelete) {
            return deleteNothing();
        }

        if (await hasReplies(commentToDelete)) {
            return softDelete(commentToDelete);
        }
    };

    const deleteNothing = () => {
        return {
            deleted: 0,
            softDelete: false,
            message: 'Comment not found, nothing to delete.'
        };
    };

    const hasReplies = async ({ id: commentId }) => {
        const replies = await commentsDb.findReplies({
            commentId,
            publishedOnly: false
        });
        return replies.length > 0;
    };

    const softDelete = async (commentInfo) => {
        const toDelete = makeComment(commentInfo);
        toDelete.markDeleted();
        await commentsDb.update({
            id: toDelete.getId(),
            author: toDelete.getAuthor(),
            text: toDelete.getText(),
            replyToId: toDelete.getReplyToId(),
            postId: toDelete.getPostId()
        });

        return {
            deleted: 1,
            softDelete: true,
            message: 'Comment has replies. Soft delted.'
        };
    };

    return removeComment;

};

export default makeRemoveComment;