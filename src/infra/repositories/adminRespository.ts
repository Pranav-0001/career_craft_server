import { MongoDBAdmnin } from "../Database/adminModel";
import { admin } from "../../domain/models/admin";

export type adminRepository={
    findAdminByEmail:(email:string)=>Promise<admin | null>
}

export const AdminRepositoryImpl = (adminModel: MongoDBAdmnin): adminRepository => {
    const findAdminByEmail=async(email:string):Promise<admin | null>=>{
        const user=await adminModel.findOne({email});
        return user ? user.toObject() : null;
    }


    return {
        findAdminByEmail
    }
}