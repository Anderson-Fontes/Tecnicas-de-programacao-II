import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { formatTelefone } from '../utils/format';

interface Usuario {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
}

interface Props {
    usuario: Usuario | null;
    onClose: () => void;
    viewOnly?: boolean; // Novo prop
    onSaved?: () => Promise<void> | void; // <-- nova prop: callback chamada após salvar (suporta async)
}

const onlyDigits = (s: string) => s.replace(/\D/g, '');

const UsuarioModal: React.FC<Props> = ({ usuario, onClose, viewOnly = false, onSaved }) => {
    const [formData, setFormData] = useState<Usuario>({
        nome: '',
        email: '',
        telefone: '',
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                ...usuario,
                telefone: usuario.telefone ? formatTelefone(String(usuario.telefone)) : '',
            });
        } else {
            // reset quando for criar novo usuário
            setFormData({ nome: '', email: '', telefone: '' });
        }
    }, [usuario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const formatted = formatTelefone(raw);
        setFormData(prev => ({ ...prev, telefone: formatted }));
    };

    const isEmailValid = (email: string) => {
        // Validação mais rigorosa para e-mail
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
        
        // Verificações adicionais
        if (email.includes('..')) return false; // Não permite pontos consecutivos
        if (email.startsWith('.')) return false; // Não permite ponto no início
        if (email.endsWith('.')) return false; // Não permite ponto no final
        
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        // Validação dos campos
        if (!formData.nome.trim()) {
            await Swal.fire({ icon: 'warning', title: 'Nome obrigatório', text: 'Por favor, preencha o campo Nome.' });
            return;
        }
        if (!formData.email.trim() || !isEmailValid(formData.email.trim())) {
            await Swal.fire({ icon: 'warning', title: 'E‑mail inválido', text: 'Informe um e‑mail em formato válido.' });
            return;
        }
        const telefoneDigits = onlyDigits(formData.telefone || '');
        if (telefoneDigits.length !== 11) {
            await Swal.fire({ 
                icon: 'warning', 
                title: 'Telefone inválido', 
                text: 'Informe o telefone no formato (99) 99999-9999.' 
            });
            return;
        }

        try {
            const method = usuario ? 'PUT' : 'POST';
            const url = usuario
                ? `http://localhost:3001/api/usuarios/${usuario.id}`
                : 'http://localhost:3001/api/usuarios';

            console.log('Dados sendo enviados:', {
                method,
                url,
                body: formData
            });

            const payload = {
                ...formData,
                telefone: telefoneDigits // envie apenas dígitos ao backend (ou adapte conforme sua API)
            };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => null);
                throw new Error(text || `Erro: ${response.status}`);
            }

            const data = await response.json();
            console.log('Sucesso:', data);

            // Notifica o pai para atualizar a lista antes de fechar (aguarda se for async)
            if (onSaved) await onSaved();

            await Swal.fire({ icon: 'success', title: 'Salvo', text: 'Usuário salvo com sucesso.' });

            onClose();
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            await Swal.fire({ icon: 'error', title: 'Erro', text: 'Erro ao salvar usuário.' });
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{viewOnly ? 'Visualizar Usuário' : usuario ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                {usuario && <p>ID: {usuario.id}</p>}
                <input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    disabled={viewOnly}
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    disabled={viewOnly}
                />
                <input
                    name="telefone"
                    value={formData.telefone}
                    onChange={viewOnly ? undefined : handlePhoneChange}
                    placeholder="(99) 99999-9999"
                    disabled={viewOnly}
                />
                <div className="button-group">
                    {!viewOnly && <button type="button" onClick={handleSubmit}>Salvar</button>}
                    <button type="button" onClick={onClose}>{viewOnly ? 'Voltar' : 'Cancelar'}</button>
                </div>
            </div>
        </div>
    );
};

export default UsuarioModal;