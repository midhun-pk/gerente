import makeComment from '../entities';

const makeAddComment = ({ commentsDb }) => {
    const addComment = async (commentInfo) => {
        const comment = makeComment(commentInfo);
        const exists = await commentsDb.findByHash({ hash: comment.getHash() });
        if (exists) {
            return exists;
        }
        const commentSource = comment.getSource();
        return await commentsDb.insert({
            author: comment.getAuthor(),
            createdOn: comment.getCreatedOn(),
            hash: comment.getHash(),
            id: comment.getId(),
            modifiedOn: comment.getModifiedOn(),
            postId: comment.getPostId(),
            published: comment.isPublished(),
            replyToId: comment.getReplyToId(),
            source: {
                ip: commentSource.getIp(),
                browser: commentSource.getBrowser(),
                referrer: commentSource.getReferrer()
            },
            text: comment.getText()
        });
    };
    return addComment;
};

export default makeAddComment;