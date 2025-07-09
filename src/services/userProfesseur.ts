// services/userProfesseur.ts
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import User from "../models/users";

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
