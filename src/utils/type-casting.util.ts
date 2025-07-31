import { ObjectId } from 'mongodb';

export const toObjectId = (id: string | ObjectId): ObjectId => {
  return typeof id === 'string' ? new ObjectId(id) : id;
};
