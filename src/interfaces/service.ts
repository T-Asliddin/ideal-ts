
export  interface Get {
    limit: number,
    page:number
}


export interface Request{
    get :(data:Get)=>any
}