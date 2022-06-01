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
import { CreateDisciplinaVersaoController } from "./controller/disciplina_versao/CreateDisciplinaVersaoController";
import { GetAllDisciplinaVersoesController } from "./controller/disciplina_versao/GetAllDisciplinaVersoesController";
import { DeleteDisciplinaVersaoController } from "./controller/disciplina_versao/DeleteDisciplinaVersaoController";
import { UpdateDisciplinaVersaoController } from "./controller/disciplina_versao/UpdateDisciplinaVersaoController";
import { CreatePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/CreatePpcDisciplinaVersaoController";
import { GetAllPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/GetAllPpcDisciplinaVersaoController";
import { DeletePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/DeletePpcDisciplinaVersaoController";
import { UpdatePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/UpdatePpcDisciplinaVersaoController";
import { CreatePerfilPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/CreatePerfilPpcDisciplinaVersaoController";
import { GetOnePpcController } from "./controller/ppc/GetOnePpcController";
import { CreateCompetenciaPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/CreateCompetenciaPpcDisciplinaVersaoController";
import { GetOneDisciplinaVersaoController } from "./controller/disciplina_versao/GetOneDisciplinaVersaoController";
import { GetOneDisciplinaController } from "./controller/disciplina/GetOneDisciplinaController";
import { GetOneAreaController } from "./controller/area/GetOneAreaController";
import { GetOneCursoController } from "./controller/curso/GetOneCursoController";
import { GetOnePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/GetOnePpcDisciplinaVersaoController";
import { DeletePerfilPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/DeletePerfilPpcDisciplinaVersaoController";
import { DeleteCompetenciaPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/DeleteCompetenciaPpcDisciplinaVersaoController";
import { GetOneCompetenciaController } from "./controller/competencia/GetOneCompetenciaController";
import { GetOnePerfilController } from "./controller/perfil/GetOnePerfilController";
import { CreateAutorController } from "./controller/autor/CreateAutorController";
import { GetAllAutoresController } from "./controller/autor/GetAllAutoresController";
import { GetOneAutorController } from "./controller/autor/GetOneAutorController";
import { DeleteAutorController } from "./controller/autor/DeleteAutorController";
import { UpdateAutorController } from "./controller/autor/UpdateAutorController";
import { CreateObraController } from "./controller/obra/CreateObraController";
import { GetAllObrasController } from "./controller/obra/GetAllObrasController";
import { GetOneObraController } from "./controller/obra/GetOneObraController";
import { DeleteObraController } from "./controller/obra/DeleteObraController";
import { UpdateObraController } from "./controller/obra/UpdateObraController";
import { CreateBibliografiaController } from "./controller/bibliografia/CreateBibliografiaController";
import { GetAllBibliografiasController } from "./controller/bibliografia/GetAllBibliografiasController";
import { GetOneBibliografiaController } from "./controller/bibliografia/GetOneBibliografiaController";
import { DeleteBibliografiaController } from "./controller/bibliografia/DeleteBibliografiaController";
import { UpdateBibliografiaController } from "./controller/bibliografia/UpdateBibliografiaController";
import { CreateObraAutorController } from "./controller/obra_autor/CreateObraAutorController";
import { GetAllObraAutorController } from "./controller/obra_autor/GetAllObraAutorController";
import { GetOneObraAutorController } from "./controller/obra_autor/GetOneObraAutorController";
import { DeleteObraAutorController } from "./controller/obra_autor/DeleteObraAutorController";
import { UpdateObraAutorController } from "./controller/obra_autor/UpdateObraAutorController";

const routes = Router();

routes.post("/areas", new CreateAreaController().handle);
routes.get("/areas", new GetAllAreasController().handle);
routes.get("/area/:id", new GetOneAreaController().handle);
routes.delete("/areas/:id", new DeleteAreaController().handle);
routes.put("/areas/:id", new UpdateAreaController().handle);

routes.post("/disciplinas", new CreateDisciplinaController().handle);
routes.get("/disciplinas", new GetAllDisciplinasController().handle);
routes.get("/disciplina/:id", new GetOneDisciplinaController().handle);
routes.delete("/disciplinas/:id", new DeleteDisciplinaController().handle);
routes.put("/disciplinas/:id", new UpdateDisciplinaController().handle);

routes.post("/cursos", new CreateCursoController().handle);
routes.get("/cursos", new GetAllCursosController().handle);
routes.get("/curso/:id", new GetOneCursoController().handle);
routes.delete("/cursos/:id", new DeleteCursoController().handle);
routes.put("/cursos/:id", new UpdateCursoController().handle);

routes.post("/ppcs", new CreatePpcController().handle);
routes.get("/ppcs", new GetAllPpcsController().handle);
routes.get("/ppc/:id", new GetOnePpcController().handle);
routes.delete("/ppcs/:id", new DeletePpcController().handle);
routes.put("/ppcs/:id", new UpdatePpcController().handle);

routes.post("/competencias", new CreateCompetenciaController().handle);
routes.get("/competencias", new GetAllCompetenciasController().handle);
routes.get("/competencia/:id", new GetOneCompetenciaController().handle);
routes.delete("/competencias/:id", new DeleteCompetenciaController().handle);
routes.put("/competencias/:id", new UpdateCompetenciaController().handle);

routes.post("/perfis", new CreatePerfilController().handle);
routes.get("/perfis", new GetAllPerfisController().handle);
routes.get("/perfil/:id", new GetOnePerfilController().handle);
routes.delete("/perfis/:id", new DeletePerfilController().handle);
routes.put("/perfis/:id", new UpdatePerfilController().handle);

routes.post("/versoes", new CreateDisciplinaVersaoController().handle);
routes.get("/versoes", new GetAllDisciplinaVersoesController().handle);
routes.get("/versao/:id", new GetOneDisciplinaVersaoController().handle);
routes.delete("/versoes/:id", new DeleteDisciplinaVersaoController().handle);
routes.put("/versoes/:id", new UpdateDisciplinaVersaoController().handle);

routes.post("/autores", new CreateAutorController().handle);
routes.get("/autores", new GetAllAutoresController().handle);
routes.get("/autor/:id", new GetOneAutorController().handle);
routes.delete("/autores/:id", new DeleteAutorController().handle);
routes.put("/autores/:id", new UpdateAutorController().handle);

routes.post("/obras", new CreateObraController().handle);
routes.get("/obras", new GetAllObrasController().handle);
routes.get("/obra/:id", new GetOneObraController().handle);
routes.delete("/obras/:id", new DeleteObraController().handle);
routes.put("/obras/:id", new UpdateObraController().handle);

routes.post("/bibliografias", new CreateBibliografiaController().handle);
routes.get("/bibliografias", new GetAllBibliografiasController().handle);
routes.get("/bibliografia/:id", new GetOneBibliografiaController().handle);
routes.delete("/bibliografias/:id", new DeleteBibliografiaController().handle);
routes.put("/bibliografias/:id", new UpdateBibliografiaController().handle);

routes.post("/obra_autor", new CreateObraAutorController().handle);
routes.get("/obras_autores", new GetAllObraAutorController().handle);
routes.get("/obra_autor/:id", new GetOneObraAutorController().handle);
routes.delete("/obra_autor/:id", new DeleteObraAutorController().handle);
routes.put("/obra_autor/:id", new UpdateObraAutorController().handle);

routes.post("/ppc_disciplina_versao", new CreatePpcDisciplinaVersaoController().handle);
routes.get("/ppc_disciplina_versoes", new GetAllPpcDisciplinaVersaoController().handle);
routes.get("/ppc_disciplina_versao/:id", new GetOnePpcDisciplinaVersaoController().handle);
routes.delete("/ppc_disciplina_versao/:id", new DeletePpcDisciplinaVersaoController().handle);
routes.put("/ppc_disciplina_versao/:id", new UpdatePpcDisciplinaVersaoController().handle);

routes.post("/perfil_ppc_disciplina_versao/:perfil_id", new CreatePerfilPpcDisciplinaVersaoController().handle);
routes.post("/competencia_ppc_disciplina_versao/:competencia_id", new CreateCompetenciaPpcDisciplinaVersaoController().handle);
routes.delete("/perfil_ppc_disciplina_versao/:perfil_id", new DeletePerfilPpcDisciplinaVersaoController().handle);
routes.delete("/competencia_ppc_disciplina_versao/:competencia_id", new DeleteCompetenciaPpcDisciplinaVersaoController().handle);

export { routes }