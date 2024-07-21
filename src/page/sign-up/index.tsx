import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUpValidationSChame } from "@validation";
import { auth } from "@service";
import { useMask } from "@react-input/mask";
// import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Notification from "@notification";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUp } from "@auth-interfaces";
import { SignUpModal } from "@modal";
import { setDataToCookie } from "@data-service";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const initialValues: SignUp = {
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
  };

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (value: SignUp) => {
    const phone = value.phone_number.replace(/\D/g, "");
    const payload = { ...value, phone_number: `+${phone}` };
    try {
      const response = await auth.sign_up(payload);
      if (response.status === 200) {
        setDataToCookie("email", value.email);
        setOpen(true);
      }
    } catch (error) {
      Notification({ title: "Nimadir xato", type: "error" });
    }
  };

  return (
    <>
      <ToastContainer />
      <SignUpModal open={open} handleClose={() => setOpen(false)} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[600px]  p-5">
          <h1 className="text-[50px] my-3 text-center ">Register</h1>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signUpValidationSChame}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="full_name"
                  type="text"
                  as={TextField}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="full_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="phone_number"
                  type="text"
                  as={TextField}
                  label="Phone"
                  fullWidth
                  variant="outlined"
                  inputRef={inputRef}
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="phone_number"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Eamil"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Submitting" : "Ro'yxatdan o'tish"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className=" flex justify-center items-center mt-7 ">
            Ro'yxatdan o'tganmisiz?
            <NavLink className=" text-blue-500  ml-5" to="/">
              Tizmiga kirish
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
