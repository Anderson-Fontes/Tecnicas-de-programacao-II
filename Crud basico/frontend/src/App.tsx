import React, { useEffect, useState } from 'react';
import UsuarioTabela from './components/UsuarioTabela';
import UserModal from './components/UsuarioModal';
import { Usuario } from './types/Usuario';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3001/api/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUsuario(null);
    setIsViewMode(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (usuario: Usuario) => {
    const result = await Swal.fire({
      title: 'Confirmar exclusão?',
      text: `Deseja realmente excluir o usuário ${usuario.nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3001/api/usuarios/${usuario.id}`, { 
          method: 'DELETE' 
        });
        
        await Swal.fire({
          title: 'Excluído!',
          text: 'Usuário foi excluído com sucesso.',
          icon: 'success'
        });
        
        fetchUsers();
      } catch (error) {
        await Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível excluir o usuário.',
          icon: 'error'
        });
      }
    }
  };

  return (
    <div className="App">
      <h1>Cadastro de Usuários</h1>
      <button onClick={() => { setSelectedUsuario(null); setIsViewMode(false); setShowModal(true); }}>
        Novo Usuário
      </button>
      <UsuarioTabela
        usuarios={usuarios}
        onView={(usuario) => { setSelectedUsuario(usuario); setIsViewMode(true); setShowModal(true); }}
        onEdit={(usuario) => { setSelectedUsuario(usuario); setIsViewMode(false); setShowModal(true); }}
        onDelete={handleDelete}
      />
      {showModal && (
        <UserModal
          usuario={selectedUsuario}
          onClose={handleClose}
          viewOnly={isViewMode}
          onSaved={fetchUsers}
        />
      )}
    </div>
  );
}

export default App;