export interface User {
    uid: string,
    nickname: string,
    avatar: string,
    email: string,
    website: string
}

export interface LoginForm {
    username: string,
    password: string
}