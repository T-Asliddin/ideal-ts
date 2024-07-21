import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { auth } from "@service";
import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditPasswordInValidationSChame } from "@validation";
import { ModalProps } from "@global-interfaces";
import { ForgotPassword } from "@auth-interfaces";
import { setDataToCookie } from "@data-service";
import { EditCodModal } from "@modal";

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
  const [openn, setOpenn] = useState(false);
  const initialValues: ForgotPassword = {
    email: "",
  };
  const handleSubmit = async (value: ForgotPassword) => {
    try {
      const response = await auth.forgot_password(value);
      if (response.status === 200) {
        setDataToCookie("email", value.email);
        handleClose() 
        setOpenn(true)
      }
    } catch (error) {}
  };

  return (
    <div>
      <EditCodModal open={openn} handleClose={()=>setOpenn(false)}/>
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
            Email kiriting
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={EditPasswordInValidationSChame}
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
