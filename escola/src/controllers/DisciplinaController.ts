// src/controllers/DisciplinaController.ts
import { Request, Response } from "express";
import { Disciplina } from "../models";

class DisciplinaController {
  public async create(req: Request, res: Response): Promise<any> {
    const { descricao} = req.body;
    try {
      //a instância de um modelo é chamada de documento
      const document = new Disciplina ({ descricao });
      // ao salvar serão aplicadas as validações do esquema
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error && error.errors ["descricao"]) {
        return res.json({ message: error.errors ["descricao"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<any> {
    try {
      const objects = await Disciplina.find().sort({ descricao: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete (req: Request, res: Response): Promise<any> {
    const { id: _id } = req.body; // _id do registro a ser excluído
    try {
      const object = await Disciplina.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: "Disciplina excluída com sucesso" });
      } else {
        return res.json({ message: "Disciplina inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update (req: Request, res: Response): Promise<any> {
    const { id: _id, descricao} = req.body;
    try {
      // busca o documento existente na coleção antes de fazer o update
      const document = await Disciplina.findById(_id);
      if (!document) {
        return res.json({ message: "Disciplina inexistente" });
      }
      // atualiza os campos
      document.descricao = descricao;
      // ao salvar serão aplicadas as validações do esquema
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error && error.errors ["descricao"]) {
        return res.json({ message: error.errors ["descricao"].message });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new DisciplinaController();