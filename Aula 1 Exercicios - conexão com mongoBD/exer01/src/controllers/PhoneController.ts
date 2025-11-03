import { type Request, type Response } from "express";
import { Phone } from "../models/index.js";

class PhoneController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { idpeople, number } = req.body;
    try {
      const document = new Phone({ idpeople, number });
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      if (error.errors) {
        if (error.errors["idpeople"]) {
          return res.json({ message: error.errors["idpeople"].message });
        }
        if (error.errors["number"]) {
          return res.json({ message: error.errors["number"].message });
        }
      }
      return res.json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { idpeople } = req.body; // Lista telefones por pessoa
    try {
      const query = idpeople ? { idpeople } : {};
      const objects = await Phone.find(query)
        .populate("idpeople")
        .sort({ number: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.body;
    try {
      const object = await Phone.findByIdAndDelete(_id);
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
    const { _id, idpeople, number } = req.body;
    try {
      const document = await Phone.findById(_id);
      if (!document) {
        return res.json({ message: "Telefone inexistente" });
      }
      document.idpeople = idpeople;
      document.number = number;
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      if (error.errors) {
        if (error.errors["idpeople"]) {
          return res.json({ message: error.errors["idpeople"].message });
        }
        if (error.errors["number"]) {
          return res.json({ message: error.errors["number"].message });
        }
      }
      return res.json({ message: error.message });
    }
  }
}
export default new PhoneController();