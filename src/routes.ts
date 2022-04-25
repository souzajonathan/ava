import { Router } from "express";
import { CreateAreaController } from "./controller/CreateAreaController";
import { CreateDisciplinaController } from "./controller/CreateDisciplinaController";
import { DeleteAreaController } from "./controller/DeleteAreaController";
import { DeleteDisciplinaController } from "./controller/DeleteDisciplinaController";
import { GetAllAreasController } from "./controller/GetAllAreasController";
import { GetAllDisciplinasController } from "./controller/GetAllDisciplinasController";
import { UpdateAreaController } from "./controller/UpdateAreaController";
import { UpdateDisciplinaController } from "./controller/UpdateDisciplinaController";

const routes = Router();

routes.post("/areas", new CreateAreaController().handle);
routes.get("/areas", new GetAllAreasController().handle);
routes.delete("/areas/:id", new DeleteAreaController().handle);
routes.put("/areas/:id", new UpdateAreaController().handle);

routes.post("/disciplinas", new CreateDisciplinaController().handle);
routes.get("/disciplinas", new GetAllDisciplinasController().handle);
routes.delete("/disciplinas", new DeleteDisciplinaController().handle);
routes.put("/disciplinas/:id", new UpdateDisciplinaController().handle);

export { routes }