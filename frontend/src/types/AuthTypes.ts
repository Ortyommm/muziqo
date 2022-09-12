export interface IAuthPayload {
  email: string;
  password: string;
  name?: string;
}

export interface IAuthResponseData {
  token: string;
}
