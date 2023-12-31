export interface User {
    _id      ?:string
    email     : string;
    username  : string;
    firstname : string;
    lastname  : string;
    password  : string;
    company  ?: string;
    location ?: string;
    role     ?: string;
    profileImg?:string;
    isGoogle?:boolean
    status?:boolean
    basic?:object 
    profile?:object 
    education?:object 
    professional?:object
    isPrime?:boolean
    subscribedDate?:string
    Expiry?:string 
    subscriptionStatus?:string,
    mockPer?:number
    facebook?:string
    instagram?:string
    linkedIn?:string
    gitHub?:string
}

export interface socialType{
    facebook?:string
    instagram?:string
    linkedIn?:string
    gitHub?:string
}