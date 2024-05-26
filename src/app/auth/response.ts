import { User } from "./user";

export class LoginReponse{

  message!: string;
  data!: Data;
  status!: string;
}

export class Data{
  user!:User;
}
