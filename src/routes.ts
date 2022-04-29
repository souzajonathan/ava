import { Router } from "express";
import { CreateAreaController } from "./controller/area/CreateAreaController";
import { CreateDisciplinaController } from "./controller/disciplina/CreateDisciplinaController";
import { DeleteAreaController } from "./controller/area/DeleteAreaController";
import { DeleteDisciplinaController } from "./controller/disciplina/DeleteDisciplinaController";
import { GetAllAreasController } from "./controller/area/GetAllAreasController";
import { GetAllDisciplinasController } from "./controller/disciplina/GetAllDisciplinasController";
import { UpdateAreaController } from "./controller/area/UpdateAreaController";
import { UpdateDisciplinaController } from "./controller/disciplina/UpdateDisciplinaController";
import { UpdateCursoController } from "./controller/curso/UpdateCursoController";
import { DeleteCursoController } from "./controller/curso/DeleteCursoController";
import { GetAllCursosController } from "./controller/curso/GetAllCursosController";
import { CreateCursoController } from "./controller/curso/CreateCursoController";
import { CreatePpcController } from "./controller/ppc/CreatePpcController";
import { GetAllPpcsController } from "./controller/ppc/GetAllPpcsController";
import { DeletePpcController } from "./controller/ppc/DeletePpcController";
import { UpdatePpcController } from "./controller/ppc/UpdatePpcController";
import { CreateCompetenciaController } from "./controller/competencia/CreateCompetenciaController";
import { GetAllCompetenciasController } from "./controller/competencia/GetAllCompetenciasController";
import { DeleteCompetenciaController } from "./controller/competencia/DeleteCompetenciaController";
import { UpdateCompetenciaController } from "./controller/competencia/UpdateCompetenciaController";
import { CreatePerfilController } from "./controller/perfil/CreatePerfilController";
import { GetAllPerfisController } from "./controller/perfil/GetAllPerfisController";
import { DeletePerfilController } from "./controller/perfil/DeletePerfilController";
import { UpdatePerfilController } from "./controller/perfil/UpdatePerfilController";

const routes = Router();

routes.post("/areas", new CreateAreaController().handle);
routes.get("/areas", new GetAllAreasController().handle);
routes.delete("/areas/:id", new DeleteAreaController().handle);
routes.put("/areas/:id", new UpdateAreaController().handle);

routes.post("/disciplinas", new CreateDisciplinaController().handle);
routes.get("/disciplinas", new GetAllDisciplinasController().handle);
routes.delete("/disciplinas/:id", new DeleteDisciplinaController().handle);
routes.put("/disciplinas/:id", new UpdateDisciplinaController().handle);

routes.post("/cursos", new CreateCursoController().handle);
routes.get("/cursos", new GetAllCursosController().handle);
routes.delete("/cursos/:id", new DeleteCursoController().handle);
routes.put("/cursos/:id", new UpdateCursoController().handle);

routes.post("/ppcs", new CreatePpcController().handle);
routes.get("/ppcs", new GetAllPpcsController().handle);
routes.delete("/ppcs/:id", new DeletePpcController().handle);
routes.put("/ppcs/:id", new UpdatePpcController().handle);

routes.post("/competencias", new CreateCompetenciaController().handle);
routes.get("/competencias", new GetAllCompetenciasController().handle);
routes.delete("/competencias/:id", new DeleteCompetenciaController().handle);
routes.put("/competencias/:id", new UpdateCompetenciaController().handle);

routes.post("/perfis", new CreatePerfilController().handle);
routes.get("/perfis", new GetAllPerfisController().handle);
routes.delete("/perfis/:id", new DeletePerfilController().handle);
routes.put("/perfis/:id", new UpdatePerfilController().handle);

export { routes }