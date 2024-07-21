import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { OrderModal } from "@modal";
import { OrderTable } from "@ui";
import { order } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 2 });
  const handleChange = (event: any, value: number) => {
    setParams({
      ...params,
      page: value,
    });
  };

  const getdata = async () => {
    try {
      const response = await order.get(params);      
      if (response.status === 200 && response.data.orders_list) {
        let total = Math.ceil(response.data.total / params.limit);
        setCount(total);
        setData(response.data.orders_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, [params]);

  return (
    <>
      <OrderModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className=" flex justify-end ">
          <Button onClick={() => setOpen(true)} variant="contained">
            Add
          </Button>
        </div>
        <OrderTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
