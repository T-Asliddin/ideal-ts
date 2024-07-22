import request from "../config"
import { Request } from "@client-interfaces"

const service:Request={
    get:(params)=>request.get("/client/all" , {params}),
    delete:(params)=>request.delete("/client" , {params}),

}

export default service