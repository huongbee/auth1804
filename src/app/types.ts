export const URL = 'http://localhost:3000';

export interface ServerResponse {
    code: number;
    data: any | User | Post | Post[];
    message: string;
}
export interface User {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
}
export interface Post {
    _id: string;
    content: string;
}
