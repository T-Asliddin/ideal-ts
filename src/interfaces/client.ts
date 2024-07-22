export interface Params {
  limit: number;
  page: number;
}
export interface Delete {
    client_id: string;
    owner_id:string
  }

export interface Request {
  get: (data: Params) => any;
  delete: (data: Delete) => any;

}
