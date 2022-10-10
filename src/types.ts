export interface IUser {
    uid: string,
    name: string,
    email: string,
    passwords: IPassword[],
    password?: string;
}

export interface IPassword {
    id?: string;
    label: string;
    password: string;
}