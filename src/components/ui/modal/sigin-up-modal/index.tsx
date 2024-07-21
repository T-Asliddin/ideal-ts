import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SinCodeValidationSChame } from "@validation";
import { auth } from "@service";
import { ModalProps } from "@global-interfaces";
import { AuthVerify } from "@auth-interfaces";
import { getDataFromCookie } from "@data-service";
import Notification from "@notification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";

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
  const navigate = useNavigate();
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

  const initialValues: AuthVerify = {
    code: "",
  };

  const handleSubmit = async (value: AuthVerify) => {
    const payload = { ...value, email: getDataFromCookie("email") };
    try {
      const response = await auth.auth_verify(payload);
      console.log(response);
      if (response.status == 201) {
        handleClose();
        Notification({
          title: "Ro'yxatdan muofaqiyatli o'tdingiz",
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      Notification({ title: "Nimadir xato", type: "error" });
    }
  };
  // e1d5c5f9-3f84-4ed0-ad27-b207a9698503
  return (
    <div>
      <ToastContainer />
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
            Codni kiriting
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={SinCodeValidationSChame}
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
                  /><Typography variant="body1" component="p" className="my-4">
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
