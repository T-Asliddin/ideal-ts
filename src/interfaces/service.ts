export interface Create {
  name: string;
  price: string | number;
}

export interface Update extends Create {
  id: string;
}

export interface Delete {
  id: string;
}

export interface Params {
    limit:number;
    page:number
}

export interface Request {
  get: (data: Params) => any;
  create: (data: Create) => any;
  update: (data: Update) => any;
  delete: (data: Delete) => any;
}
