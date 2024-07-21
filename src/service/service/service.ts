import request from "../config"
import { Request } from "@service-interfaces"

const service:Request={
    get:(params)=>request.get("/service/all" , {params}),
    create:(data)=>request.post("/service" , data),
    update:(data)=>request.put("/service" , data),
    delete:(id)=>request.delete("/service" , {params:{id}}),



}

export default service