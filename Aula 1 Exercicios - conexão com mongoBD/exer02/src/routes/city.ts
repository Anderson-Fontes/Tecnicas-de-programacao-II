import { Router } from "express";
import controller from "../controllers/CityController.js";

const routes = Router();
// Para criar/listar uma cidade, precisamos saber o ID do estado
routes.post("/:stateId", controller.create);
routes.get("/:stateId", controller.list);
export default routes;