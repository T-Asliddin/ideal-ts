import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSChame } from "@validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "@service";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Notification from "@notification";
import { ToastContainer } from "react-toastify";
import { SigIn } from "@auth-interfaces";
import { EditPassword } from "@modal";
import { setDataToCookie } from "@data-service";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const[open,setOpen]=useState(false)

  const initialValues:SigIn = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values:SigIn) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        setDataToCookie("token",response.data.access_token)
        Notification({ title: "Success", type: "success" });
        setTimeout(() => {
          navigate("/drawer");
        }, 1500);
      }
    } catch (error) {
      Notification({ title: "Nimadir xato", type: "error" })
    }
  };

  return (
    <>
      <ToastContainer />
     <EditPassword open={open} handleClose={()=>setOpen(false)}/>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[600px]  p-5">
          <h1 className="text-[50px] my-3 text-center ">Tizmiga kirish</h1>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signInValidationSChame}
          >
            {({ isSubmitting }) => (
              <Form>
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
                <p onClick={()=>setOpen(true)} className="flex justify-end cursor-pointer">Parolni unitngizmi ?</p>
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
                    endAdornment:(
                      
                      <InputAdornment position="end">
                        <IconButton onClick={()=>{setShowPassword(!showPassword)}} edge="end">
                          {showPassword ? <VisibilityOff/> :  <Visibility/>}
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
                  {isSubmitting ? "Submitting" : "Tizimga kirish"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className=" flex justify-center items-center mt-7 ">
            Hisobingiz yo'qmi?
            <NavLink className=" text-blue-500  ml-5" to="sign-up">
              Ro'yxotdan o'tish
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
