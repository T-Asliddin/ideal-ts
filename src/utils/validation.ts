import { AuthVerify } from './../interfaces/auth';
import * as Yup from "yup";

// ==================  AUTH   ===================//

export const signInValidationSChame = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must")
    .required("Password in required"),
});

export const signUpValidationSChame = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must")
      .required("Password in required"),
      full_name:Yup.string().required("Name is required"),
      phone_number:Yup.string().min(19,"Invalid Phone Number").required("Phone number is required")
  });

  export const EditPasswordInValidationSChame = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  export const AuthVerifyValidationSChame = Yup.object().shape({
    new_password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must")
      .required("Password in required"),
      code:Yup.string().required("Code is required"),
  });


  export const SinCodeValidationSChame = Yup.object().shape({
      code:Yup.string().required("Code is required"),
  });

