import { Router } from "express";
import { CreateAreaController } from "./controller/CreateAreaController";
import { DeleteAreaController } from "./controller/DeleteAreaController";
import { GetAllAreasController } from "./controller/GetAllAreasController";
import { UpdateAreaController } from "./controller/UpdateAreaController";

const routes = Router();

routes.post("/areas", new CreateAreaController().handle);
routes.get("/areas", new GetAllAreasController().handle);
routes.delete("/areas/:id", new DeleteAreaController().handle);
routes.put("/areas/:id", new UpdateAreaController().handle);

export { routes }