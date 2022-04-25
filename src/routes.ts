import { Router } from "express";
import { CreateAreaController } from "./controller/CreateAreaController";
import { CreateDisciplinaController } from "./controller/CreateDisciplinaController";
import { DeleteAreaController } from "./controller/DeleteAreaController";
import { GetAllAreasController } from "./controller/GetAllAreasController";
import { GetAllDisciplinasController } from "./controller/GetAllDisciplinasController";
import { UpdateAreaController } from "./controller/UpdateAreaController";

const routes = Router();

routes.post("/areas", new CreateAreaController().handle);
routes.get("/areas", new GetAllAreasController().handle);
routes.delete("/areas/:id", new DeleteAreaController().handle);
routes.put("/areas/:id", new UpdateAreaController().handle);

routes.post("/disciplinas", new CreateDisciplinaController().handle);
routes.get("/disciplinas", new GetAllDisciplinasController().handle);

export { routes }