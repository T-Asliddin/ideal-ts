import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { ServiceModal } from "@modal";
import { ServiceTable } from "@ui";
import { service } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 6 });
  const handleChange = (event: any, value: number) => {
    event.delete;
    setParams({
      ...params,
      page: value,
    });
  };

  const getdata = async () => {
    try {
      const response = await service.get(params);
      if (response.status === 200 && response.data.services) {
        let total = Math.ceil(response.data.total / params.limit);
        setCount(total);
        setData(response.data.services);
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
      <ServiceModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className=" flex justify-end ">
          <Button onClick={() => setOpen(true)} variant="contained">
            Add
          </Button>
        </div>
        <ServiceTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
