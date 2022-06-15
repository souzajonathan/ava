import { Router } from "express";
import { CreateAreaController } from "./controller/area/CreateAreaController";
import { UpdateAreaController } from "./controller/area/UpdateAreaController";
import { GetOneAreaController } from "./controller/area/GetOneAreaController";
import { GetAllAreasController } from "./controller/area/GetAllAreasController";
import { DeleteAreaController } from "./controller/area/DeleteAreaController";
import { CreateDisciplinaController } from "./controller/disciplina/CreateDisciplinaController";
import { UpdateDisciplinaController } from "./controller/disciplina/UpdateDisciplinaController";
import { GetOneDisciplinaController } from "./controller/disciplina/GetOneDisciplinaController";
import { GetAllDisciplinasController } from "./controller/disciplina/GetAllDisciplinasController";
import { DeleteDisciplinaController } from "./controller/disciplina/DeleteDisciplinaController";
import { CreateCursoController } from "./controller/curso/CreateCursoController";
import { UpdateCursoController } from "./controller/curso/UpdateCursoController";
import { GetOneCursoController } from "./controller/curso/GetOneCursoController";
import { GetAllCursosController } from "./controller/curso/GetAllCursosController";
import { DeleteCursoController } from "./controller/curso/DeleteCursoController";
import { CreatePpcController } from "./controller/ppc/CreatePpcController";
import { UpdatePpcController } from "./controller/ppc/UpdatePpcController";
import { GetOnePpcController } from "./controller/ppc/GetOnePpcController";
import { GetAllPpcsController } from "./controller/ppc/GetAllPpcsController";
import { DeletePpcController } from "./controller/ppc/DeletePpcController";
import { CreatePerfilController } from "./controller/perfil/CreatePerfilController";
import { UpdatePerfilController } from "./controller/perfil/UpdatePerfilController";
import { GetOnePerfilController } from "./controller/perfil/GetOnePerfilController";
import { GetAllPerfisController } from "./controller/perfil/GetAllPerfisController";
import { DeletePerfilController } from "./controller/perfil/DeletePerfilController";
import { CreateCompetenciaController } from "./controller/competencia/CreateCompetenciaController";
import { UpdateCompetenciaController } from "./controller/competencia/UpdateCompetenciaController";
import { GetOneCompetenciaController } from "./controller/competencia/GetOneCompetenciaController";
import { GetAllCompetenciasController } from "./controller/competencia/GetAllCompetenciasController";
import { DeleteCompetenciaController } from "./controller/competencia/DeleteCompetenciaController";
import { CreateDisciplinaVersaoController } from "./controller/disciplina_versao/CreateDisciplinaVersaoController";
import { UpdateDisciplinaVersaoController } from "./controller/disciplina_versao/UpdateDisciplinaVersaoController";
import { GetOneDisciplinaVersaoController } from "./controller/disciplina_versao/GetOneDisciplinaVersaoController";
import { GetAllDisciplinaVersoesController } from "./controller/disciplina_versao/GetAllDisciplinaVersoesController";
import { DeleteDisciplinaVersaoController } from "./controller/disciplina_versao/DeleteDisciplinaVersaoController";
import { CreateAutorController } from "./controller/autor/CreateAutorController";
import { UpdateAutorController } from "./controller/autor/UpdateAutorController";
import { GetOneAutorController } from "./controller/autor/GetOneAutorController";
import { GetAllAutoresController } from "./controller/autor/GetAllAutoresController";
import { DeleteAutorController } from "./controller/autor/DeleteAutorController";
import { CreateObraController } from "./controller/obra/CreateObraController";
import { UpdateObraController } from "./controller/obra/UpdateObraController";
import { GetOneObraController } from "./controller/obra/GetOneObraController";
import { GetAllObrasController } from "./controller/obra/GetAllObrasController";
import { DeleteObraController } from "./controller/obra/DeleteObraController";
import { CreateBibliografiaController } from "./controller/bibliografia/CreateBibliografiaController";
import { UpdateBibliografiaController } from "./controller/bibliografia/UpdateBibliografiaController";
import { GetOneBibliografiaController } from "./controller/bibliografia/GetOneBibliografiaController";
import { GetAllBibliografiasController } from "./controller/bibliografia/GetAllBibliografiasController";
import { DeleteBibliografiaController } from "./controller/bibliografia/DeleteBibliografiaController";
import { CreateObraAutorController } from "./controller/obra_autor/CreateObraAutorController";
import { UpdateObraAutorController } from "./controller/obra_autor/UpdateObraAutorController";
import { GetOneObraAutorController } from "./controller/obra_autor/GetOneObraAutorController";
import { GetAllObraAutorController } from "./controller/obra_autor/GetAllObraAutorController";
import { DeleteObraAutorController } from "./controller/obra_autor/DeleteObraAutorController";
import { CreatePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/CreatePpcDisciplinaVersaoController";
import { UpdatePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/UpdatePpcDisciplinaVersaoController";
import { GetOnePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/GetOnePpcDisciplinaVersaoController";
import { GetAllPpcDisciplinaVersoesController } from "./controller/ppc_disciplina_versao/GetAllPpcDisciplinaVersoesController";
import { DeletePpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/DeletePpcDisciplinaVersaoController";
import { CreatePerfilPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/CreatePerfilPpcDisciplinaVersaoController";
import { CreateCompetenciaPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/CreateCompetenciaPpcDisciplinaVersaoController";
import { DeletePerfilPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/DeletePerfilPpcDisciplinaVersaoController";
import { DeleteCompetenciaPpcDisciplinaVersaoController } from "./controller/ppc_disciplina_versao/DeleteCompetenciaPpcDisciplinaVersaoController";
import { CalculoPedidoController } from "./controller/pedido/CalculoPedidoController";

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

routes.post("/perfis", new CreatePerfilController().handle);
routes.get("/perfis", new GetAllPerfisController().handle);
routes.get("/perfil/:id", new GetOnePerfilController().handle);
routes.delete("/perfis/:id", new DeletePerfilController().handle);
routes.put("/perfis/:id", new UpdatePerfilController().handle);

routes.post("/competencias", new CreateCompetenciaController().handle);
routes.get("/competencias", new GetAllCompetenciasController().handle);
routes.get("/competencia/:id", new GetOneCompetenciaController().handle);
routes.delete("/competencias/:id", new DeleteCompetenciaController().handle);
routes.put("/competencias/:id", new UpdateCompetenciaController().handle);

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
routes.get("/obra_autor", new GetAllObraAutorController().handle);
routes.get("/obra_autor/:id", new GetOneObraAutorController().handle);
routes.delete("/obra_autor/:id", new DeleteObraAutorController().handle);
routes.put("/obra_autor/:id", new UpdateObraAutorController().handle);

routes.post("/ppc_disciplina_versoes", new CreatePpcDisciplinaVersaoController().handle);
routes.get("/ppc_disciplina_versoes", new GetAllPpcDisciplinaVersoesController().handle);
routes.get("/ppc_disciplina_versao/:id", new GetOnePpcDisciplinaVersaoController().handle);
routes.delete("/ppc_disciplina_versoes/:id", new DeletePpcDisciplinaVersaoController().handle);
routes.put("/ppc_disciplina_versoes/:id", new UpdatePpcDisciplinaVersaoController().handle);

routes.post("/perfil_ppc_disciplina_versao/:perfil_id", new CreatePerfilPpcDisciplinaVersaoController().handle);
routes.post("/competencia_ppc_disciplina_versao/:competencia_id", new CreateCompetenciaPpcDisciplinaVersaoController().handle);
routes.delete("/perfil_ppc_disciplina_versao/:perfil_id", new DeletePerfilPpcDisciplinaVersaoController().handle);
routes.delete("/competencia_ppc_disciplina_versao/:competencia_id", new DeleteCompetenciaPpcDisciplinaVersaoController().handle);

routes.get("/pedido", new CalculoPedidoController().handle);

export { routes }