interface IUser {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  nDni: string;
  credentialsId: number | null;
}

export default IUser;
