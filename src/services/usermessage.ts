import { db } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { Message } from '../models/Message';

const messagesCollection = collection(db, 'messages');

export async function createMessage(message: Omit<Message, 'id' | 'timestamp'>): Promise<string> {
  try {
    const docRef = await addDoc(messagesCollection, {
      ...message,
      timestamp: Timestamp.fromDate(new Date()),
      isRead: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur création message:', error);
    throw error;
  }
}

export async function getMessageById(messageId: string): Promise<Message | null> {
  try {
    const docRef = doc(db, 'messages', messageId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        timestamp: data.timestamp.toDate()
      } as Message;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erreur lecture message:', error);
    throw error;
  }
}

export async function getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
  try {
    const q1 = query(
      messagesCollection,
      where('senderId', '==', userId1),
      where('receiverId', '==', userId2),
      orderBy('timestamp', 'asc')
    );
    const q2 = query(
      messagesCollection,
      where('senderId', '==', userId2),
      where('receiverId', '==', userId1),
      orderBy('timestamp', 'asc')
    );

    const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const messages1 = snap1.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate() })) as Message[];
    const messages2 = snap2.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate() })) as Message[];

    const allMessages = [...messages1, ...messages2];
    allMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    return allMessages;
  } catch (error) {
    console.error('Erreur récupération messages:', error);
    return [];
  }
}

export async function updateMessage(messageId: string, updates: Partial<Message>): Promise<void> {
  try {
    const docRef = doc(db, 'messages', messageId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Erreur mise à jour message:', error);
    throw error;
  }
}

export async function deleteMessage(messageId: string): Promise<void> {
  try {
    const docRef = doc(db, 'messages', messageId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erreur suppression message:', error);
    throw error;
  }
}