import Parameter from '../models/parameter';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

interface User {
  uid: string;
}

export async function saveUserparam(user: User) {
  console.log("saveUserparam called for uid:", user.uid);

  const param = new Parameter(
    user.uid,
    'c',    
    'm',    
    'fr',   
    'oui',  
    'non'
  );

  console.log("Paramètres à enregistrer :", param);

  try {
    await setDoc(doc(db, "parameters", user.uid), {
      uid: param.uid,
      theme: param.theme,
      taille: param.taille,
      language: param.language,
      notification: param.notification,
      lectureauto: param.lectureauto,
    });
    console.log("Enregistrement dans Firestore réussi pour uid:", user.uid);
  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement des paramètres :", error);
    if (error.message) {
      console.error("Message d'erreur détaillé:", error.message);
    }
    if (error.code) {
      console.error("Code d'erreur Firebase:", error.code);
    }
    throw error;  
  }
}
