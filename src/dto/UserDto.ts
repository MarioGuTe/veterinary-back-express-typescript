import { Credential } from "../entities/Credential";

interface UserDto {
  name: string;
  email: string;
  birthdate: Date;
  nDni: string;
  credentials: Credential;
}

export default UserDto;
