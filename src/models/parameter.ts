// src/models/parameter.ts

export default class Parameter {
  uid: string;
  theme: 'c' | 's';
  taille: 'p' | 'm' | 'g';
  language: 'fr' | 'eng' | 'esp';
  notification: 'oui' | 'non';
  lectureauto: 'oui' | 'non';

  constructor(
    uid: string,
    theme: 'c' | 's',
    taille: 'p' | 'm' | 'g',
    language: 'fr' | 'eng' | 'esp',
    notification: 'oui' | 'non' = 'oui',
    lectureauto: 'oui' | 'non' = 'non'
  ) {
    this.uid = uid;
    this.theme = theme;
    this.taille = taille;
    this.language = language;
    this.notification = notification;
    this.lectureauto = lectureauto;
  }
}
