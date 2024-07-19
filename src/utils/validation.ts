import * as Yup from "yup";

// ==================  AUTH   ===================//

export const signInValidationSChame = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must")
    .required("Password in required"),
});