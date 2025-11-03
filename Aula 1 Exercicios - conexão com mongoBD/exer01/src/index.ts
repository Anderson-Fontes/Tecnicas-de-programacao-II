import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js"; // Seja explícito com o 'index'
import connect from "./models/connection.js";

dotenv.config();
// será usado 3001 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3001;
const app = express(); // cria o servidor e coloca na variável app
// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

// define a rota para o pacote /routes
app.use(routes);