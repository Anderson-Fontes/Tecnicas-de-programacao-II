// src/models/index.ts
import mongoose from "mongoose";
const { Schema } = mongoose;
import { isValidCPF } from "./validaCPF";

// --- Schema Professor --- //
const ProfessorSchema = new Schema ({
  nome: {
    type: String,
    maxlength: [45, "O nome do professor pode ter no máximo 45 caracteres"],
    required: [true, "O nome do professor é obrigatório"],
  },
  email: {
    type: String,
    maxlength: [60, "O e-mail pode ter no máximo 60 caracteres"],
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    validate: {
      validator: function (value: string) {
        // expressão regular para validar o formato do e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) =>
        `${props.value} não é um formato de e-mail válido`,
    },
  },
  cpf: {
    type: String,
    trim: true,
    minlength: [11, "O CPF precisa ter no mínimo 11 caracteres"],
    maxlength: [11, "O CPF precisa ter no máximo 11 caracteres"],
    required: [true, "O CPF é obrigatório"],
    unique: true, // Adicionado para garantir a regra de negócio do Controller (código 11000)
    validate: {
      validator: function (value: string) {
        return isValidCPF (value);
      },
      message: (props: any) =>
        `${props.value} não é um CPF válido`,
    },
  },
}, { id: false });

// --- Schema Disciplina --- //
const DisciplinaSchema = new Schema ({
  descricao: {
    type: String,
    maxlength: [45, "A descrição da disciplina pode ter no máximo 45 caracteres"],
    required: [true, "A descrição da disciplina é obrigatória"],
  },
});

// --- Schema Professor_has_Disciplina (Tabela de Relacionamento) --- //
const Professor_has_DisciplinaSchema = new Schema ({
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
    validate: {
      validator: async function (id: string) {
        // verifica se id existe na coleção professores
        const professor = await mongoose.model("Professor").findById(id);
        return !! professor; // true se o usuário existir
      },
      message: 'O ID do professor fornecido não existe',
    },
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disciplina",
    required: true,
    validate: {
      validator: async function (id: string) {
        // verifica se id existe na coleção disciplinas
        const disciplina = await mongoose.model("Disciplina").findById(id);
        return !! disciplina; // true se o usuário existir
      },
      message: 'O ID da disciplina fornecido não existe',
    },
  },
});

// mongoose.model compila o modelo
const Professor = mongoose.model("Professor", ProfessorSchema, "professores");
const Disciplina = mongoose.model("Disciplina", DisciplinaSchema, "disciplinas");
const Professor_has_Disciplina = mongoose.model("Professor_has_Disciplina", Professor_has_DisciplinaSchema, "professor_has_disciplinas");

export { Professor, Disciplina, Professor_has_Disciplina };