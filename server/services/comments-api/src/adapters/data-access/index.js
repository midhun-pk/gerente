import makeDb from '../../../config/make-db';
import makeCommentsDb from './comment-db';

const commentsDb = makeCommentsDb(makeDb);

export default commentsDb;