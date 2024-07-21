export interface ForgotPassword {
  email: string;
}
export interface SigIn extends ForgotPassword {
  password: string;
}
export interface UpdatePassword {
  code: string;
  new_password: string;
  email?: string;
}
export interface SignUp extends SigIn {
  full_name: string;
  phone_number: string;
}

export interface AuthVerify  {
  code: string;
  email?:string
}
export interface Request {
  sign_in: (data: SigIn) => any;
  sign_up: (data: SignUp) => any;
  auth_verify: (data: AuthVerify) => any;
  forgot_password: (data: ForgotPassword) => any;
  update_passwor: (data: UpdatePassword) => any;
}
