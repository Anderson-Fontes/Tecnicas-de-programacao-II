import React from 'react';
import { formatTelefone } from '../utils/format';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

interface Props {
  usuarios: Usuario[];
  onView: (usuario: Usuario) => void;
  onEdit: (usuario: Usuario) => void;
  onDelete: (usuario: Usuario) => void;
}

const UsuarioTabela: React.FC<Props> = ({ usuarios, onView, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
            <td>{formatTelefone(usuario.telefone)}</td>
            <td>
              <button onClick={() => onView(usuario)}>Ver</button>
              <button onClick={() => onEdit(usuario)}>Editar</button>
              <button onClick={() => onDelete(usuario)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsuarioTabela;