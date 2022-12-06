export interface loginInfoType {
    employee_number: string | number;
    password: string;
}

export interface responseType {
    access_token: string;
    access_token_exp: string;
    refresh_token: string;
}
