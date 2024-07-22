import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { ClientTable } from "@ui";
import { client } from "@service";

const Index = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 6 });
  const handleChange = (event: any, value: number) => {
    setParams({
      ...params,
      page: value,
    });
  };

  const getdata = async () => {
    try {
      const response = await client.get(params);      
      if (response.status === 200 && response.data.clients_list) {
        let total = Math.ceil(response.data.total / params.limit);
        setCount(total);
        setData(response.data.clients_list);
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
      <div className="flex flex-col gap-3">
        <ClientTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
