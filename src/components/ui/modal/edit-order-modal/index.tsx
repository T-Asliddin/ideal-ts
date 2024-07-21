import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { order, service } from "@service";
import { OrderCreateValidationSChame } from "@validation";
import { ModalProps } from "@global-interfaces";
import {  Update } from "@order-interfaces";

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
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);  
  const initialValues: Update = {
    amount: item ? item.amount : "",
    client_id: item ? item.client_name : "",
    status: item ? item.status : "",
    service_id: item ? item.service_name : "",
  };
  const getorder = async () => {
    try {
      const response = await order.get({ page: 1, limit: 100 });
      if (response.status === 200 && response.data.orders_list) {
        setOrders(response.data.orders_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getorder();
  }, []);

  const getdata = async () => {
    try {
      const response = await service.get({ page: 1, limit: 100 });
      if (response.status === 200 && response?.data?.services) {
        setData(response?.data?.services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
console.log(initialValues);

  const handleSubmit = async (value: Update) => {   
    try {
      const payload = { ...value,id:item.id  };
      const response = await order.update(payload);
      if (response.status === 200) {
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          className="text-center"
        >
          Update Order
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          // validationSchema={}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Field
                name="client_id"
                as={Select}
                label="Client Name"
                fullWidth
                variant="outlined"
                margin="normal"
                value={values.client_id || ""}
                onChange={(e: any) =>
                  setFieldValue("client_id", e.target.value)
                }
              >
                {orders.map((i: any) => (
                  <MenuItem key={i.client_id} value={i.client_id}>
                    {i.client_name}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage
                name="service_id"
                component="p"
                className="text-[red] text-[15px]"
              />
              <Field
                name="status"
                as={Select}
                label="Status"
                fullWidth
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="in_process">In process</MenuItem>
                <MenuItem value="done">Done</MenuItem>
                <MenuItem value="takne">Takne</MenuItem>
              </Field>
              <ErrorMessage
                name="status"
                component="p"
                className="text-[red] text-[15px]"
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
                as={Select}
                label="Service"
                fullWidth
                variant="outlined"
                margin="normal"
                value={values.service_id || ""}
                onChange={(e: any) =>
                  setFieldValue("service_id", e.target.value)
                }
              >
                {data.map((service: any) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage
                name="service_id"
                component="p"
                className="text-[red] text-[15px]"
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
      </Box>
    </Modal>
  );
}
