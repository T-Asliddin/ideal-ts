import request from "../config";
import { Request } from "@order-interfaces";

const service: Request = {
  get: (params) => request.get("/order/all", { params }),
  delete:(id)=>request.delete("/order" , {params:{id}}),
  create: (data) => request.post("/order", data),


};

export default service;
