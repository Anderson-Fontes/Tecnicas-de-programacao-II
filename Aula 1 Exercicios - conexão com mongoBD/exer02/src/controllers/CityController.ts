import { type Request, type Response } from "express";
import { State } from "../models/index.js";

// O CityController manipula o array 'cities' dentro de um 'State'
class CityController {
  // Adiciona uma nova cidade a um estado
  public async create(req: Request, res: Response): Promise<Response> {
    const { stateId } = req.params; // ID do estado vem pela URL
    const { name } = req.body; // Dados da nova cidade
    try {
      const state = await State.findById(stateId);
      if (!state) {
        return res.json({ message: "Estado não encontrado" });
      }
      // Adiciona a nova cidade ao array de subdocumentos
      state.cities.push({ name, districts: [] });
      const resp = await state.save();
      return res.json(resp);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  // Lista as cidades de um estado
  public async list(req: Request, res: Response): Promise<Response> {
    const { stateId } = req.params; // ID do estado vem pela URL
    try {
      const state = await State.findById(stateId);
      if (!state) {
        return res.json({ message: "Estado não encontrado" });
      }
      return res.json(state.cities);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }
}
export default new CityController();