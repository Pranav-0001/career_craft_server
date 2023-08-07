import nodemailer from 'nodemailer'

export const generateSignupOtp =(email:string):number=>{
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
        text: otp+''
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


export const generateForgotPasswordOtp =(email:string):number=>{
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
        subject:"Password Reset OTP",
        text: `You recently requested to reset your password for your account at CareerCraft. To proceed with the password reset, please use the following OTP. OTP: ${otp}. 
        Please note that this OTP is valid for a limited time and can be used only once. Do not share this OTP with anyone for security reasons.`
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