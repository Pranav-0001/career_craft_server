import nodemailer from 'nodemailer'

export const generateEmpSignupOtp =(email:string):number=>{
    let otp:number=Math.floor(Math.random()*1000000)
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
        subject:"Email Verification",
        text: `This email is to inform you that your Verification OTP is ${otp}. Please keep this code private and refrain from sharing it with anyone. It is essential for the security and integrity of your account.`
    }

    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("success");
        }
    })
    return otp  
}