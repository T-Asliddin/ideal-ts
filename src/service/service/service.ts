import request from "../config"
import { Request } from "../../interfaces/service"

const service:Request={
    get:(params)=>request.get("/service/all" , {params}),
}

export default service