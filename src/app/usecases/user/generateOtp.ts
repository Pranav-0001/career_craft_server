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
        subject:"Login OTP",
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