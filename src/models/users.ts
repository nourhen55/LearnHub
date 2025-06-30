// src/models/users.ts

export default class User {
  uid: string;
  name: string;
  email: string;
  password: string;
  photoURL?: string;
  createdAt?: Date;

  constructor(
    uid: string,
    name: string,
    email: string,
    photoURL: string,
    createdAt: Date,
    password: string
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
    this.createdAt = createdAt;
    this.password = password;
  }

  displayInfo() {
    return `${this.name} (${this.email})`;
  }
}
