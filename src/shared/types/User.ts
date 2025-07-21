export interface RegisterInput {
    email: string;
    password: string;
    username: string;

}
export interface LoginInput {
    email: string;
    password: string;
}
export interface User {
    id: string;
    email: string;
    username: string;
    access_token: string;
}