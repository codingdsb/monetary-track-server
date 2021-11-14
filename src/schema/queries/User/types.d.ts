export interface ILogin {
  username_or_email: string;
  password: string;
}

export interface IGetUserDetailsById {
  auth_token: string;
}
