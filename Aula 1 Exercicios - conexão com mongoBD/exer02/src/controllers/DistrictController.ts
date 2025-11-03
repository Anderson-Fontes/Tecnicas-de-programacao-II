import { type Request, type Response } from "express";
import { State } from "../models/index.js";

// O DistrictController manipula o array 'districts' dentro de uma 'City'
class DistrictController {
  // Adiciona um novo distrito a uma cidade
  public async create(req: Request, res: Response): Promise<Response> {
    const { stateId, cityId } = req.params; // IDs vêm pela URL
    const { name } = req.body; // Dados do novo distrito
    try {
      const state = await State.findById(stateId);
      if (!state) {
        return res.json({ message: "Estado não encontrado" });
      }
      // Encontra a cidade dentro do array de cidades do estado
      const city = state.cities.id(cityId);
      if (!city) {
        return res.json({ message: "Cidade não encontrada" });
      }
      // Adiciona o novo distrito ao array de subdocumentos
      city.districts.push({ name });
      const resp = await state.save(); // Salva o documento 'State' pai
      return res.json(resp);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  // Lista os distritos de uma cidade
  public async list(req: Request, res: Response): Promise<Response> {
    const { stateId, cityId } = req.params; // IDs vêm pela URL
    try {
      const state = await State.findById(stateId);
      if (!state) {
        return res.json({ message: "Estado não encontrado" });
      }
      const city = state.cities.id(cityId);
      if (!city) {
        return res.json({ message: "Cidade não encontrada" });
      }
      return res.json(city.districts);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }
}
export default new DistrictController();