const makeCommentsDb = ({ makeDb }) => {
    const findAll = async ({ publishedOnly = true } = {}) => {
        const db = await makeDb();
        const query = publishedOnly ? { published: true } : {};
        const result = await db.collection('comments').find(query);
        return (await result.toArray()).map(({_id: id, ...comment}) => ({
            id,
            ...comment
        }));
    };
    return Object.freeze({
        findAll
    });
};

export default makeCommentsDb;