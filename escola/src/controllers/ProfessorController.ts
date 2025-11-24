// src/controllers/ProfessorController.ts
import { Request, Response } from "express";
import { Professor } from "../models";

class ProfessorController {
  public async create(req: Request, res: Response): Promise<any> {
    const { nome, email, cpf} = req.body;
    try {
      //a instância de um modelo é chamada de documento
      const document = new Professor ({ nome, email, cpf });
      // ao salvar serão aplicadas as validações do esquema
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // código 11000 e 11001 indica violação de restrição única (indice duplicado)
        return res.json({ message: "CPF ou e-Mail já em uso" });
      } else if (error && error.errors["nome"]) {
        return res.json({ message: error.errors ["nome"].message });
      } else if (error && error.errors ["email"]) {
        return res.json({ message: error.errors["email"].message });
      } else if (error && error.errors["cpf"]) {
        return res.json({ message: error.errors ["cpf"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<any> {
    try {
      const objects = await Professor.find().sort({ nome: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete (req: Request, res: Response): Promise<any> {
    const { id: _id } = req.body; // _id do registro a ser excluído
    try {
      const object = await Professor.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: "Professor excluído com sucesso" });
      } else {
        return res.json({ message: "Professor inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update (req: Request, res: Response): Promise<any> {
    const { id: _id, nome, email, cpf} = req.body;
    try {
      // busca o usuário existente na coleção antes de fazer o update
      const document = await Professor.findById(_id);
      if (!document) {
        return res.json({ message: "Professor inexistente" });
      }
      // atualiza os campos
      document.nome = nome;
      document.email = email;
      document.cpf = cpf;
      // ao salvar serão aplicadas as validações do esquema
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // código 11000 e 11001 indica violação de restrição única (indice duplicado)
        return res.json({ message: "CPF ou e-Mail já em uso" });
      } else if (error && error.errors["nome"]) {
        return res.json({ message: error.errors ["nome"].message });
      } else if (error && error.errors ["email"]) {
        return res.json({ message: error.errors["email"].message });
      } else if (error && error.errors ["cpf"]) {
        return res.json({ message: error.errors ["cpf"].message });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new ProfessorController();