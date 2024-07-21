export interface Params {
    limit:number;
    page:number
}
export interface Delete {
    id: string;
  }

  export interface Create{
    amount:string |number;
    client_full_name:string;
    client_phone_number:string;
    service_id:string
  }

  export interface Update{
    amount:string |number;
    client_id:string;
    status:string;
    service_id:string
    id?:string
  }


export interface Request {
  get: (data: Params) => any;
  delete: (data: Delete) => any;
  create:(data:Create)=>any
  update:(data:Update)=>any

  
}