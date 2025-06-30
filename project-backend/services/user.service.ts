import { db } from '../firebase/firebase.config';
import User from '../../src/models/users'
export async function saveUser(userData: User) {
  await db.collection('users').doc(userData.uid).set(userData);
}

export async function findUserById(uid: string) {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? doc.data() : null;
}
