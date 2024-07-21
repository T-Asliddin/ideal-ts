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

export interface Request {
  get: (data: Params) => any;
  delete: (data: Delete) => any;
  create:(data:Create)=>any

  
}