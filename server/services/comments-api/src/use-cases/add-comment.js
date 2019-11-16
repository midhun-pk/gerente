import  makeComment from '../entities';

const addCommentFactory = ({ commnetsDb }) => {
    const addComment = async (commentInfo) => {
        const comment = makeComment(commentInfo);
        const exists = await commnetsDb.findByHash({ hash: comment.getHash() });
        if (exists) {
            return exists;
        }
        const commentSource = comment.getSource();
        return commnetsDb.insert({
            author: comment.getAuthor(),
            createdOn: comment.getCreatedOn(),
            hash: comment.gethash(),
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

export default addCommentFactory;