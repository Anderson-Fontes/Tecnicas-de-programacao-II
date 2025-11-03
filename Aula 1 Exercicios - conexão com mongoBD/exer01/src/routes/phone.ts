import { Router } from "express";
import controller from "../controllers/PhoneController.js";

const routes = Router();
routes.post("/", controller.create);
routes.get("/", controller.list); // O ID da pessoa (idpeople) é opcional e vai no body
routes.delete("/", controller.delete);
routes.put("/", controller.update);
export default routes;