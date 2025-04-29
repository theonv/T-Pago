export default function user(req,res) {
    const dados = {
        email: "admin@gmail.com",
        senha: "admin"
      };
    
      res.status(200).json(dados);
}