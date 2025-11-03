import { Router } from "express";
import controller from "../controllers/DistrictController.js";

const routes = Router();
// Para criar/listar um distrito, precisamos do ID do estado e da cidade
routes.post("/:stateId/:cityId", controller.create);
routes.get("/:stateId/:cityId", controller.list);
export default routes;