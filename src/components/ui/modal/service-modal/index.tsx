import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { service } from "@service";
import { ServiceCreateValidationSChame } from "@validation";
import { ModalProps } from "@global-interfaces";
import { Create } from "@service-interfaces";

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

export default function BasicModal({ open, handleClose, item }: ModalProps) {
  const initialValues: Create = {
    name: item ? item.name :"",
    price: item ? item.price: "", 
  };

  const handleSubmit = async (value: Create) => {    
    if (item) {
      const payload = {
        ...value,
        id:item.id
      };
      try {
        const response = await service.update(payload);
        if (response.status === 200) {
          handleClose()
          window.location.reload();
        }
      } catch (error) {}
    } else {
      try {
        const response = await service.create(value);      
        if (response.status === 201) {
          handleClose();
          window.location.reload();
        }
      } catch (error) {}
    }
  };
  return (
    <div>
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
            Create Service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={ServiceCreateValidationSChame}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="name"
                    type="text"
                    as={TextField}
                    label="Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    helperText={
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="price"
                    type="number"
                    as={TextField}
                    label="Price"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    helperText={
                      <ErrorMessage
                        name="price"
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
