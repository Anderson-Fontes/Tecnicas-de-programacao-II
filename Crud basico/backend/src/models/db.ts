import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres', // Altere conforme seu usuário do SGDB [cite: 64, 250]
  host: 'localhost',
  database: 'usuarios', // Nome do banco de dados criado [cite: 66, 250]
  password: '123', // Altere conforme sua senha [cite: 67, 250]
  port: 5432,
});

async function query(sql: string, params?: any[]) {
  try {
    const res = await pool.query(sql, params);
    if (res.command == 'INSERT') {
      return res.rows[0]; // Retorna o registro inserido [cite: 71, 73]
    } else if (res.command == 'SELECT') {
      return res.rows; // Retorna todos os registros [cite: 74, 76]
    } else if (res.command == 'DELETE' || res.command == 'UPDATE') {
      return { rowcount: res.rowCount }; // Retorna o número de linhas afetadas [cite: 77, 79]
    } else {
      return { sql };
    }
  } catch (e: any) {
    return { message: e.message };
  }
}

export default query;