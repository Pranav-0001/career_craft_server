import { User } from "../../../domain/models/user"
import { userRepository} from "../../../infra/repositories/userRepository"
import nodemailer from 'nodemailer'


export const Nonpremium=(userRepository:userRepository)=>async():Promise<User[]>=>{
    const users=await userRepository.getNonPremiumUser()
    return users
}

export const Premium=(userRepository:userRepository)=>async():Promise<User[]>=>{
    const users=await userRepository.getPremiumUser()
    return users
}

export const Employers=(userRepository:userRepository)=>async():Promise<User[]>=>{
    const users=await userRepository.getEmployers()
    return users
}


export const sentConfirmationMail =(email:string)=>{
    
    let mailTransporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.OTP_EMAIL,
            pass:process.env.OTP_PASSWORD
        }
    })
    let details={
        from:process.env.OTP_EMAIL,
        to:email,
        subject:"Registration Approval: Employer Account Activated",
        text: `We are pleased to inform you that your registration as an employer on our platform has been approved by the admin. Your employer account is now activated and ready to use.

        As an approved employer, you gain access to various features and functionalities to help you connect with potential candidates and post job opportunities. We believe that this platform will provide you with valuable resources to grow your team and find the right talent for your organization.
        
        If you have any questions or need assistance, please feel free to reach out to our support team. We are here to help you make the most of your experience on our platform.
        
        Thank you for choosing our platform for your recruitment needs. We wish you all the best in finding the perfect candidates for your organization.
        
        Best regards,
        Career Craft`
    }

    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("success");
        }
    })
    
}