import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState ,useEffect} from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { order ,service} from "@service";
import { useMask } from "@react-input/mask";
import { OrderCreateValidationSChame } from "@validation";
import { ModalProps } from "@global-interfaces";
import { Create } from "@order-interfaces";

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
  const [params, setParams] = useState({ page: 1, limit: 100 });
  const [data ,setData ]= useState([])

  const initialValues: Create = {
    amount:"",
    client_full_name:"",
    client_phone_number:"",
    service_id:"",
  };
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const getdata = async () => {
    try {
      const response = await service.get(params);
      if (response.status === 200 && response.data.services) {
        setData(response.data.services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, [params]);

  const handleSubmit = async (value: Create) => {
    console.log(item);
    try {
      const response = await order.create(value);      
      if (response.status === 201) {
        handleClose();
        window.location.reload();
      }
    } catch (error) {}
    // if (item) {
    //   const payload = {
    //     ...value,
    //     id:item.id
    //   };
    //   try {
    //     const response = await service.update(payload);
    //     if (response.status === 200) {
    //       handleClose()
    //       window.location.reload();
    //     }
    //   } catch (error) {}
    // } else {
    //   try {
    //     const response = await service.create(value);      
    //     if (response.status === 201) {
    //       handleClose();
    //       window.location.reload();
    //     }
    //   } catch (error) {}
    // }
  };
  console.log(data);

  data.map(i=>{
    console.log(i);
    
  })
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
            Create Order
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={OrderCreateValidationSChame}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="client_full_name"
                    type="text"
                    as={TextField}
                    label="Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    helperText={
                      <ErrorMessage
                        name="client_full_name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="client_phone_number"
                    type="text"
                    as={TextField}
                    label="Phone"
                    fullWidth
                    inputRef={inputRef}
                    variant="outlined"
                    margin="normal"
                    helperText={
                      <ErrorMessage
                        name="client_phone_number"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="amount"
                    type="number"
                    as={TextField}
                    label="Amount"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    helperText={
                      <ErrorMessage
                        name="amount"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                   <Field
                    name="service_id"
                    type="text"
                    as={Select}
                    label="Server"
                    fullWidth
                    variant="outlined"
                    margin="10px"
                    helperText={
                      <ErrorMessage
                        name="service_id"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  >
                  {
                    data?.map((i:any,index)=>{
                      (
                        <MenuItem key={index} value={i.id}>{i.name}</MenuItem>
                      )
                    })
                  }
                  </Field>

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
