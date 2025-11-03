import { type Request, type Response } from "express";
import { Person } from "../models/index.js";

class PersonController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    try {
      const document = new Person({ name });
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Este nome (name) já está em uso" });
      }
      if (error.errors["name"]) {
        return res.json({ message: error.errors["name"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const objects = await Person.find().sort({ name: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.body;
    try {
      const object = await Person.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: "Registro excluído com sucesso" });
      } else {
        return res.json({ message: "Registro inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { _id, name } = req.body;
    try {
      const document = await Person.findById(_id);
      if (!document) {
        return res.json({ message: "Registro inexistente" });
      }
      document.name = name;
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Este nome (name) já está em uso" });
      }
      if (error.errors["name"]) {
        return res.json({ message: error.errors["name"].message });
      }
      return res.json({ message: error.message });
    }
  }
}
export default new PersonController();