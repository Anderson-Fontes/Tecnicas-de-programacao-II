import React from 'react';

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<Props> = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal">
            <p>Tem certeza que deseja excluir este usuário?</p>
            <button onClick={onConfirm}>Sim</button>
            <button onClick={onCancel}>Não</button>
        </div>
    );
};

export default ConfirmDialog;