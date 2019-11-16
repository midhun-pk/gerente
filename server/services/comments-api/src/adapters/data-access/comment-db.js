import Id from '../../utils/Id';

const makeCommentsDb = ({ makeDb }) => {
    const collectionName = 'comments';

    const findAll = async ({ publishedOnly = true } = {}) => {
        const db = await makeDb();
        const query = publishedOnly ? { published: true } : {};
        const result = await db.collection(collectionName).find(query);
        return (await result.toArray()).map(({ _id: id, ...comment }) => ({
            id,
            ...comment
        }));
    };

    const findById = async ({ id: _id }) => {
        const db = await makeDb();
        const query = { _id };
        const result = await db.collection(collectionName).findOne(query);
        if (!result) {
            return null;
        }
        const { _id: id, ...info } = result;
        return { id, ...info };
    };

    const findByHash = async ({ hash }) => {
        const db = await makeDb();
        const query = { hash };
        const result = await db.collection(collectionName).findOne(query);
        if (!result) {
            return null;
        }
        const { _id: id, ...info } = result;
        return { id, ...info };
    };

    const insert = async ({ id: _id = Id.makeId(), ...commentInfo }) => {
        const db = await makeDb();
        const result = await db.collection(collectionName).insertOne({ _id, ...commentInfo });
        const { _id: id, ...insertedInfo } = result.ops[ 0 ];
        return { id, ...insertedInfo };
    };

    const update = async ({ id: _id, ...commentInfo }) => {
        const db = await makeDb();
        const result = await db.collection(collectionName).updateOne({ _id }, { $set: { ...commentInfo } });
        return result.modifiedCount > 0 ? { id: _id, ...commentInfo } : null;
    };

    const remove = async ({ id: _id }) => {
        const db = await makeDb();
        const result = await db.collection(collectionName).deleteOne({ _id });
        return result.deletedCount;
    };

    return Object.freeze({
        findAll,
        findById,
        findByHash,
        insert,
        update,
        remove
    });
};

export default makeCommentsDb;