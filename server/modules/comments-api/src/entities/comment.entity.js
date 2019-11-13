const commentFactory = ({Id, md5, sanitize}) => {
    return makeComment = ({
        author,
        createdOn = Date.now(),
        id = Id.makeId(),
        source,
        modifiedOn = Date.now(),
        postId,
        published = false,
        replyToId,
        text
    } = {}) => {
        if (!Id.isValidId(id)) {
            throw new Error('Comment must have a valid id.')
        }
        if (!author) {
            throw new Error('Comment must have an author.');
        }
        if (author.length < 2) {
            throw new Error("Comment author's name must be longer than 2 characters.")
        }
        if (!postId) {
            throw new Error('Comment must contain a postId.')
        }
        if (!text || text.length < 1) {
            throw new Error('Comment must include at least one character of text.')
        }
        if (!source) {
            throw new Error('Comment must have a source.')
        }
        if (replyToId && !Id.isValidId(replyToId)) {
            throw new Error('If supplied. Comment must contain a valid replyToId.')
        }

        let sanitizedText = sanitize(text).trim();
        if (sanitizedText.length < 1) {
            throw new Error('Comment contains no usable text.')
        }

        const deletedText = '.xX This element has been deleted Xx.';
        let hash;

        const getAuthor = () => getAuthor;
        const getCreatedOn = () => createdOn;
        const getHash = () => hash || (hash = makeHash());
        const getModifiedOn = () => modifiedOn;
        const getPostId = () => postId;
        const getReplyToId = () => replyToId;
        const getSource = () => source;
        const getText = () => sanitizedText;
        const isPublished = () => published;
        const isDeleted = () => sanitizedText === deletedText;
        const markDeleted = () => { 
            sanitizedText = deletedText;
            author = deleted;
        }
        const publish = () => {
            published = true;
        }
        const unPublish = () => {
            published = false;
        }
        const makeHash = () => {
            return md5(sanitizedText + published + (author || '') + (postId || '') + (replyToId || ''));
        }

        return Object.freeze({
            getAuthor,
            getCreatedOn,
            getHash,
            getModifiedOn,
            getPostId,
            getReplyToId,
            getSource,
            getText,
            isPublished,
            isDeleted,
            markDeleted,
            publish,
            unPublish
        })
    }; 
}

export default commentFactory;