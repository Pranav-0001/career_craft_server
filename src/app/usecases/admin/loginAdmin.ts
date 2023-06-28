import { admin } from "../../../domain/models/admin";
import { adminRepository } from "../../../infra/repositories/adminRespository";
import bcrypt from "bcrypt"

export const loginAdmin = (adminRepository: adminRepository) => async (email: string, password: string): Promise<admin | string | null> => {
    const admin=await adminRepository.findAdminByEmail(email)
    if(admin){
        if(await bcrypt.compare(password, admin.password)){
            return admin
        }else{
            return "password"
        }
    }
    return "email"
}
