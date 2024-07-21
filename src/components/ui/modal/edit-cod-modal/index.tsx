import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthVerifyValidationSChame } from "@validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState ,useEffect} from "react";
import { auth } from "@service";
import { ModalProps } from "@global-interfaces";
import { UpdatePassword } from "@auth-interfaces";
import { getDataFromCookie } from "@data-service";
import Notification from "@notification"
import { ToastContainer } from "react-toastify";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose }: ModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  useEffect(() => {
    let timer = null;
    if (open) {
      timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open]);
  useEffect(() => {
    if (secondsLeft === 0) {
      handleClose();
    }
  }, [secondsLeft, handleClose]);
  const initialValues: UpdatePassword = {
    code: "",
    new_password: "",
  };

  const handleSubmit = async (value: UpdatePassword) => {
    console.log(getDataFromCookie("email"));

    const payload = { ...value, email: getDataFromCookie("email") };

    try {
      const response = await auth.update_passwor(payload);
      console.log(response);
      
      if (response.status == 201) {
        handleClose();
        Notification({ title: "Parol muofaqiyatli o'zgartirildi", type: "success" });
      }
    } catch (error) {
      Notification({ title: "Nimadir xato", type: "error" });

    }
  };

  return (
    <div>
      <ToastContainer/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            variant="h4"
            component="h2"
            className="text-center "
          >
            Parolni yangilash
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={AuthVerifyValidationSChame}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="code"
                    type="text"
                    as={TextField}
                    label="Cod"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    helperText={
                      <ErrorMessage
                        name="code"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="new_password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    as={TextField}
                    fullWidth
                    margin="normal"
                    helperText={
                      <ErrorMessage
                        name="new_password"
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
                  <Typography variant="body1" component="p" className="my-4">
                {`Time left: ${secondsLeft} seconds`}
              </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? "Submitting" : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
