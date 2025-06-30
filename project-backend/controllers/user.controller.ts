import { Request, Response } from 'express';
import { saveUser, findUserById } from '../services/user.service';

export async function createUser(req: Request, res: Response) {
  const user = req.body;
  try {
    await saveUser(user);
    res.status(201).send({ message: "Utilisateur ajouté avec succès" });
  } catch  {
    res.status(500).send({ error: "Erreur serveur" });
  }
}

export async function getUser(req: Request, res: Response) {
  const uid = req.params.uid;
  try {
    const user = await findUserById(uid);
    if (user) res.send(user);
    else res.status(404).send({ message: "Utilisateur non trouvé" });
  } catch  {
    res.status(500).send({ error: "Erreur serveur" });
  }
}
