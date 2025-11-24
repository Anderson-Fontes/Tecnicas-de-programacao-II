import { Request, Response } from 'express';
import { pool } from '../models/db'; // Importa pool de db.ts [cite: 91]

export const getUsuarios = async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM usuario ORDER BY id'); // Alterado para 'usuario'
  res.json(result.rows);
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]); // Alterado para 'usuario' e $1
  res.json(result.rows[0]);
};

export const createUsuario = async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body;
  const result = await pool.query(
    'INSERT INTO usuario (nome, email, telefone, data_criacao) VALUES ($1, $2, $3, NOW()) RETURNING *', // Alterado para 'usuario'
    [nome, email, telefone]
  );
  res.json(result.rows[0]);
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  const result = await pool.query(
    'UPDATE usuario SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *', // Alterado para 'usuario'
    [nome, email, telefone, id]
  );
  res.json(result.rows[0]);
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM usuario WHERE id = $1', [id]); // Alterado para 'usuario'
  res.sendStatus(204);
};