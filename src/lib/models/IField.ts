export interface Field<type> {
    value:type,
    isValid?:boolean,
    error?:string
}