export interface INewNote {
  title: string;
  content: string;
}

export interface ILogInData {
  email: string;
  password: string;
}

export interface ISignInData extends ILogInData {
  confirm_password: string;
}
