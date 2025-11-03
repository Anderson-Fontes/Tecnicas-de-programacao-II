import { type Request, type Response } from "express";
import { State } from "../models/index.js";

class StateController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cities } = req.body;
    try {
      // cities é opcional na criação do estado
      const document = new State({ name, cities: cities || [] });
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Este nome (name) de estado já está em uso" });
      }
      if (error.errors["name"]) {
        return res.json({ message: error.errors["name"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const objects = await State.find().sort({ name: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.body;
    try {
      const object = await State.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: "Estado excluído com sucesso" });
      } else {
        return res.json({ message: "Estado inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { _id, name } = req.body;
    try {
      const document = await State.findById(_id);
      if (!document) {
        return res.json({ message: "Estado inexistente" });
      }
      document.name = name;
      // Não mexemos nas cities aqui, só no nome do estado
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Este nome (name) de estado já está em uso" });
      }
      if (error.errors["name"]) {
        return res.json({ message: error.errors["name"].message });
      }
      return res.json({ message: error.message });
    }
  }
}
export default new StateController();