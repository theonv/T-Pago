const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.freesmtpservers.com",
  port: 25
});

async function enviar(destino,assunto,texto,htm) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <admin@Ta-Pago.email>', // sender address
      to: destino, // Quem Recebe
      subject: assunto, // Assunto
      text: texto, // Texto Pleno
      html: htm, // html body
    });
  
    console.log("Mensagem enviada", info.messageId);
  }
  module.exports = enviar;