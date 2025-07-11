import { getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import User from "../models/users";

const db = getFirestore();

export async function saveUserToFirestore(user: User) {
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, {
    uid: user.uid,
    name: user.name,
    email: user.email,
    role: user.role,
    photoURL: user.photoURL,
    createdAt: user.createdAt,
    password: user.password || "", // Par précaution
  });
}

export async function newUserToFirestore(newUser: User) {
  try {
    const userDocRef = doc(db, "users", newUser.uid);
    await setDoc(userDocRef, {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      password: newUser.password,
      photoURL: newUser.photoURL || "",
      createdAt: new Date(),
    });
    console.log(`✅ Utilisateur ${newUser.name} sauvegardé avec succès dans Firestore.`);
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde de l'utilisateur:", error);
  }
}

export async function updateUserInFirestore(user: User) {
  const userDocRef = doc(db, "users", user.email);
  await updateDoc(userDocRef, {
    email: user.email,
    password: user.password,

  });
}

export async function deleteUserFromFirestore(uid: string) {
  const userDocRef = doc(db, "users", uid);
  await deleteDoc(userDocRef);
}

export async function getUserFromFirestore(uid: string): Promise<User | null> {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return new User(
      data.uid,
      data.name,
      data.email,
      data.role,
      data.status,
      data.photoURL,
      data.createdAt.toDate(),
      data.password
    );
  }

  return null;
}
