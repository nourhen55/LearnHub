export interface Message {
  id: string;
  senderId: string;         // ID de l'expéditeur (ex: "student" ou ID enseignant)
  receiverId: string;       // ID du destinataire
  content: string;          // Contenu du message (texte, URL image, etc.)
  timestamp: Date;          // Date et heure d’envoi du message
  isRead: boolean;          // Statut lu ou non
  type: 'text' | 'image' | 'file'; // Type de message
  fileName?: string;        // Nom du fichier si type = file ou image
  fileUrl?: string;         // URL du fichier si uploadé
  fileSize?: number;        // Taille en octets si fichier
  replyTo?: string;         // ID du message auquel on répond (optionnel)
  reactions?: {
    emoji: string;
    users: string[];        // Liste des utilisateurs ayant réagi
  }[];
}
