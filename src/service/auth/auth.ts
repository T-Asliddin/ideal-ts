import request from "../config"
import { Request } from "@auth-interfaces"

const auth:Request={
    sign_in: (data)=> request.post("/auth/login",data),
    sign_up: (data)=> request.post("/auth/register", data),
    auth_verify: (data)=> request.post("/auth/verify", data),
    update_passwor: (data)=>request.post("/auth/verify-forgot-password",data),
    forgot_password: (data)=>request.post("/auth/forgot-password",data),
}

export default auth