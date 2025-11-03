import { type Request, type Response } from "express";
import { Car } from "../models/index.js";

class CarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { model } = req.body;
    try {
      const document = new Car({ model });
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Este modelo (model) já está em uso" });
      }
      if (error.errors["model"]) {
        return res.json({ message: error.errors["model"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const objects = await Car.find().sort({ model: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.body;
    try {
      const object = await Car.findByIdAndDelete(_id);
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
    const { _id, model } = req.body;
    try {
      const document = await Car.findById(_id);
      if (!document) {
        return res.json({ message: "Registro inexistente" });
      }
      document.model = model;
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Este modelo (model) já está em uso" });
      }
      if (error.errors["model"]) {
        return res.json({ message: error.errors["model"].message });
      }
      return res.json({ message: error.message });
    }
  }
}
export default new CarController();