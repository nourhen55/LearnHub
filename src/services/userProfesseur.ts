// services/userProfesseur.ts
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import User from "../models/users";

// READ
export async function fetchProfessors(): Promise<User[]> {
  const professeurs: User[] = [];
  try {
    const q = query(collection(db, "users"), where("role", "==", "professeur"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      professeurs.push(
        new User(
          data.uid,
          data.name,
          data.email,
          data.role,
          data.password,
          data.status,
          data.photoURL,
          data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
        )
      );
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des professeurs:", error);
  }
  return professeurs;
}

// CREATE
export async function addProfessor(user: User) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.name,
      email: user.email,
      role: "professeur",
      password: user.password,
      status: user.status,
      photoURL: user.photoURL,
      createdAt: user.createdAt || new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout du professeur :", error);
    throw error;
  }
}

// UPDATE
export async function updateProfessor(id: string, updatedData: Partial<User>) {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, updatedData);
  } catch (error) {
    console.error("Erreur lors de la modification du professeur :", error);
    throw error;
  }
}

// DELETE
export async function deleteProfessor(id: string) {
  try {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Erreur lors de la suppression du professeur :", error);
    throw error;
  }
}
