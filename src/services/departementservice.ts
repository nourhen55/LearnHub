// src/services/departementservice.ts

import { db } from '../firebase'; 
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { Departement } from '../models/departement';

const departementCollection = collection(db, 'departements');


export const addDepartement = async (departement: Omit<Departement, 'id'>) => {
  const docRef = await addDoc(departementCollection, departement);
  return { id: docRef.id, ...departement };
};
export const getAllDepartements = async (): Promise<Departement[]> => {
  const snapshot = await getDocs(departementCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Departement, 'id'>),
  }));
};
export const updateDepartement = async (id: string, updatedData: Partial<Departement>) => {
  const departementDoc = doc(db, 'departements', id);
  await updateDoc(departementDoc, updatedData);
};

export const deleteDepartement = async (id: string) => {
  const departementDoc = doc(db, 'departements', id);
  await deleteDoc(departementDoc);
};
