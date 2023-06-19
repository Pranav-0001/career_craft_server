export interface User {
    email     : string;
    username  : string;
    firstname : string;
    lastname  : string;
    password  : string;
    company  ?: string;
    location ?: string;
    role     ?: string;
}