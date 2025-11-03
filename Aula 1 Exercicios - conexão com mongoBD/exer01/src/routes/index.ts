import { Router, type Request, type Response } from "express";
import person from "./person.js";
import car from "./car.js";
import phone from "./phone.js";
import carbyperson from "./carbyperson.js";

const routes = Router();
routes.use("/person", person);
routes.use("/car", car);
routes.use("/phone", phone);
routes.use("/carbyperson", carbyperson);

//aceita qualquer método HTTP ou URL
routes.use((_: Request, res: Response) =>
  res.json({ error: "Requisição desconhecida" })
);
export default routes;