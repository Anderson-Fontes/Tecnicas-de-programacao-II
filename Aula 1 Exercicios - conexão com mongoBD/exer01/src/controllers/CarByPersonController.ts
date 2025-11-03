import { type Request, type Response } from "express";
import { CarByPerson } from "../models/index.js";

class CarByPersonController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { idcar, idpeople } = req.body;
    try {
      const document = new CarByPerson({ idcar, idpeople });
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { idpeople } = req.body; // Lista carros por pessoa
    try {
      const objects = await CarByPerson.find({ idpeople }).populate("idcar");
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.body;
    try {
      const object = await CarByPerson.findByIdAndDelete(_id);
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
    const { _id, idcar, idpeople } = req.body;
    try {
      const document = await CarByPerson.findById(_id);
      if (!document) {
        return res.json({ message: "Registro inexistente" });
      }
      document.idcar = idcar;
      document.idpeople = idpeople;
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }
}
export default new CarByPersonController();