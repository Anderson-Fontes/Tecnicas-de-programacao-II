import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'; // Nome do arquivo atualizado
import dotenv from "dotenv";

dotenv.config();

// Usa a variável de ambiente PORT ou padrão 3000 (embora o .env use 3001)
const PORT = process.env.PORT || 3000; 

const app = express();

app.use(cors()); // Permite acesso entre diferentes domínios (frontend e backend)
app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição
app.use('/api', userRoutes); // Adiciona as rotas no prefixo /api 

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Atualizado para usar a variável PORT