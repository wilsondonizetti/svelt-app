import type { IUser } from "$lib/models/IUser";

export const AuthService = {
    auth: async (params:IUser):Promise<Response> => {
        var response = await fetch('https://mocktarget.apigee.net/user');
        console.log('response', response);
        return response;
    }
}