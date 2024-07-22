import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { order, service } from "@service";
import { OrderUpdateValidationSChame } from "@validation";
import { ModalProps } from "@global-interfaces";
import { Update } from "@order-interfaces";
import { FormControl, InputLabel } from "@mui/material";

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
    amount: item?.amount,
    client_id: item?.client_id || "",
    status: item?.status,
    service_id: item?.service_id || "",
  };
  const getorder = async () => {
    try {
      const response = await order.get({ page: 1, limit: 100 });
      if (response.status === 200 && response?.data?.orders_list) {
        setOrders(response?.data?.orders_list);
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
  const handleSubmit = async (value: Update) => {
    try {
      const payload = { ...value, id: item.id };
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
          validationSchema={OrderUpdateValidationSChame}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="client-select-label">Client Name</InputLabel>
                <Field
                  name="client_id"
                  as={Select}
                  labelId="client-select-label"
                  label="Client Name"
                  value={values.client_id || ""}
                  onChange={(e: any) =>
                    setFieldValue("client_id", e.target.value)
                  }
                  displayEmpty
                >
                  {orders.map((order: any) => (
                    <MenuItem key={order.client_id} value={order.client_id}>
                      {order.client_name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Field
                  name="status"
                  as={Select}
                  labelId="status-select-label"
                  label="Status"
                  value={values.status || ""}
                  onChange={(e: any) => setFieldValue("status", e.target.value)}
                >
                  <MenuItem disabled value=""></MenuItem>
                  <MenuItem value="in_process">In process</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                  <MenuItem value="takne">Takne</MenuItem>
                </Field>
              </FormControl>

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
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="service-select-label">Service</InputLabel>
                <Field
                  name="service_id"
                  as={Select}
                  labelId="service-select-label"
                  label="Service"
                  value={values.service_id || ""}
                  onChange={(e: any) =>
                    setFieldValue("service_id", e.target.value)
                  }
                  displayEmpty
                >
                  <MenuItem disabled value=""></MenuItem>
                  {data.map((service: any) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                sx={{ mt: 2 }}
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
