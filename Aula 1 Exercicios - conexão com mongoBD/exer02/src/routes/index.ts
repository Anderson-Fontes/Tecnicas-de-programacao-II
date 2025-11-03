import { Router, type Request, type Response } from "express";
import state from "./state.js";
import city from "./city.js";
import district from "./district.js";

const routes = Router();
routes.use("/state", state);
routes.use("/city", city);
routes.use("/district", district);

//aceita qualquer método HTTP ou URL
routes.use((_: Request, res: Response) =>
  res.json({ error: "Requisição desconhecida" })
);
export default routes;