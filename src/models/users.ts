// models/users.ts
export default class User {
  uid: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  photoURL?: string;
  createdAt: Date;

  constructor(
    uid: string,
    name: string,
    email: string,
    role: string,
    password: string | undefined,
    photoURL: string | undefined,
    createdAt: Date,
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.photoURL = photoURL;
    this.createdAt = createdAt;
  }


  displayInfo() {
    return `${this.name} (${this.email})`;
  }
}
