const nodemailer=require("nodemailer");

const sendmail=async(req,res,next)=>{
    const email=req.body.email
console.log(email,'email');
    const transporter=nodemailer.createTransport({
        service:"gmail",

        auth:{
            user:"gantasandhyavitasoft@gmail.com",
            pass:"fbkh uzzr zxij ywuv",
        },
    });
    let emaildata={
        from:"gantasandhyavitasoft@gmail.com",
        to: email,
        subject:"password reset",
        text:"www.google.com",
    }
    transporter.sendMail(emaildata,async(err,data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("email sent successfully");
        }
    })
}
module.exports=sendmail