import type { Field } from "./IField";

export interface IUser {
    username: Field<string>,
    password: Field<string>
}    