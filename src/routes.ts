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
import { CreatePedidoController } from "./controller/pedido/CreatePedidoController";
import { CreatePedidosController } from "./controller/pedido/CreatePedidosController";
import { GetOnePedidoController } from "./controller/pedido/GetOnePedidoController";
import { GetAllPedidosController } from "./controller/pedido/GetAllPedidosController";
import { DeletePedidoController } from "./controller/pedido/DeletePedidoController";
import { CreateComponentePedidoController } from "./controller/componente_pedido/CreateComponentePedidoController";
import { UpdateComponentePedidoController } from "./controller/componente_pedido/UpdateComponentePedidoController";
import { GetOneComponentePedidoController } from "./controller/componente_pedido/GetOneComponentePedidoController";
import { GetAllComponentesPedidoController } from "./controller/componente_pedido/GetAllComponentesPedidoController";
import { DeleteComponentePedidoController } from "./controller/componente_pedido/DeleteComponentePedidoController";
import { CreateComponentePedidoVersaoController } from "./controller/componente_pedido_versao/CreateComponentePedidoVersaoController";
import { UpdateComponentePedidoVersaoController } from "./controller/componente_pedido_versao/UpdateComponentePedidoVersaoController";
import { GetOneComponentePedidoVersaoController } from "./controller/componente_pedido_versao/GetOneComponentePedidoVersaoController";
import { GetAllComponentePedidoVersoesController } from "./controller/componente_pedido_versao/GetAllComponentesPedidoVersaoController";
import { DeleteComponentePedidoVersaoController } from "./controller/componente_pedido_versao/DeleteComponentePedidoVersaoController";
import { CreateTipoSolicitacaoController } from "./controller/tipo_solicitacao/CreateTipoSolicitacaoController";
import { UpdateTipoSolicitacaoController } from "./controller/tipo_solicitacao/UpdateTipoSolicitacaoController";
import { GetOneTipoSolicitacaoController } from "./controller/tipo_solicitacao/GetOneTipoSolicitacaoController";
import { GetAllTiposSolicitacaoController } from "./controller/tipo_solicitacao/GetAllTiposSolicitacaoController";
import { DeleteTipoSolicitacaoController } from "./controller/tipo_solicitacao/DeleteTipoSolicitacaoController";
import { CreateTipoComponenteController } from "./controller/tipo_componente/CreateTipoComponenteController";
import { UpdateTipoComponenteController } from "./controller/tipo_componente/UpdateTipoComponenteController";
import { GetOneTipoComponenteController } from "./controller/tipo_componente/GetOneTipoComponenteController";
import { GetAllTiposComponentesController } from "./controller/tipo_componente/GetAllTiposComponentesController";
import { DeleteTipoComponenteController } from "./controller/tipo_componente/DeleteTipoComponenteController";
import { CreateTrilhaComponentesController } from "./controller/trilha_componentes/CreateTrilhaComponentesController";
import { UpdateTrilhaComponentesController } from "./controller/trilha_componentes/UpdateTrilhaComponentesController";
import { GetOneTrilhaComponentesController } from "./controller/trilha_componentes/GetOneTrilhaComponentesController";
import { GetAllTrilhaComponentesController } from "./controller/trilha_componentes/GetAllTrilhaComponentesController";
import { DeleteTrilhaComponentesController } from "./controller/trilha_componentes/DeleteTrilhaComponentesController";
import { CreateComponenteTrilhaComponentesController } from "./controller/componente_trilha_componentes/CreateComponenteTrilhaComponentesController";
import { UpdateComponenteTrilhaComponentesController } from "./controller/componente_trilha_componentes/UpdateComponenteTrilhaComponentesController";
import { GetOneComponenteTrilhaComponentesController } from "./controller/componente_trilha_componentes/GetOneComponenteTrilhaComponentesController";
import { GetAllComponentesTrilhaComponentesController } from "./controller/componente_trilha_componentes/GetAllComponenteTrilhaComponentesController";
import { DeleteComponenteTrilhaComponentesController } from "./controller/componente_trilha_componentes/DeleteComponenteTrilhaComponentesController";
import { CreateInstituicaoController } from "./controller/instituicao/CreateInstituicaoController";
import { UpdateInstituicaoController } from "./controller/instituicao/UpdateInstituicaoController";
import { GetOneInstituicaoController } from "./controller/instituicao/GetOneInstituicaoController";
import { GetAllInstituicoesController } from "./controller/instituicao/GetAllInstituicoesController";
import { DeleteInstituicaoController } from "./controller/instituicao/DeleteInstituicaoController";

const routes = Router();

routes.post("/areas", new CreateAreaController().handle);
routes.put("/areas/:id", new UpdateAreaController().handle);
routes.get("/area/:id", new GetOneAreaController().handle);
routes.get("/areas", new GetAllAreasController().handle);
routes.delete("/areas/:id", new DeleteAreaController().handle);

routes.post("/disciplinas", new CreateDisciplinaController().handle);
routes.put("/disciplinas/:id", new UpdateDisciplinaController().handle);
routes.get("/disciplina/:id", new GetOneDisciplinaController().handle);
routes.get("/disciplinas", new GetAllDisciplinasController().handle);
routes.delete("/disciplinas/:id", new DeleteDisciplinaController().handle);

routes.post("/cursos", new CreateCursoController().handle);
routes.put("/cursos/:id", new UpdateCursoController().handle);
routes.get("/curso/:id", new GetOneCursoController().handle);
routes.get("/cursos", new GetAllCursosController().handle);
routes.delete("/cursos/:id", new DeleteCursoController().handle);

routes.post("/ppcs", new CreatePpcController().handle);
routes.put("/ppcs/:id", new UpdatePpcController().handle);
routes.get("/ppc/:id", new GetOnePpcController().handle);
routes.get("/ppcs", new GetAllPpcsController().handle);
routes.delete("/ppcs/:id", new DeletePpcController().handle);

routes.post("/perfis", new CreatePerfilController().handle);
routes.put("/perfis/:id", new UpdatePerfilController().handle);
routes.get("/perfil/:id", new GetOnePerfilController().handle);
routes.get("/perfis", new GetAllPerfisController().handle);
routes.delete("/perfis/:id", new DeletePerfilController().handle);

routes.post("/competencias", new CreateCompetenciaController().handle);
routes.put("/competencias/:id", new UpdateCompetenciaController().handle);
routes.get("/competencia/:id", new GetOneCompetenciaController().handle);
routes.get("/competencias", new GetAllCompetenciasController().handle);
routes.delete("/competencias/:id", new DeleteCompetenciaController().handle);

routes.post("/versoes", new CreateDisciplinaVersaoController().handle);
routes.put("/versoes/:id", new UpdateDisciplinaVersaoController().handle);
routes.get("/versao/:id", new GetOneDisciplinaVersaoController().handle);
routes.get("/versoes", new GetAllDisciplinaVersoesController().handle);
routes.delete("/versoes/:id", new DeleteDisciplinaVersaoController().handle);

routes.post("/autores", new CreateAutorController().handle);
routes.put("/autores/:id", new UpdateAutorController().handle);
routes.get("/autor/:id", new GetOneAutorController().handle);
routes.get("/autores", new GetAllAutoresController().handle);
routes.delete("/autores/:id", new DeleteAutorController().handle);

routes.post("/obras", new CreateObraController().handle);
routes.put("/obras/:id", new UpdateObraController().handle);
routes.get("/obra/:id", new GetOneObraController().handle);
routes.get("/obras", new GetAllObrasController().handle);
routes.delete("/obras/:id", new DeleteObraController().handle);

routes.post("/bibliografias", new CreateBibliografiaController().handle);
routes.put("/bibliografias/:id", new UpdateBibliografiaController().handle);
routes.get("/bibliografia/:id", new GetOneBibliografiaController().handle);
routes.get("/bibliografias", new GetAllBibliografiasController().handle);
routes.delete("/bibliografias/:id", new DeleteBibliografiaController().handle);

routes.post("/obra_autor", new CreateObraAutorController().handle);
routes.put("/obra_autor/:id", new UpdateObraAutorController().handle);
routes.get("/obra_autor/:id", new GetOneObraAutorController().handle);
routes.get("/obra_autor", new GetAllObraAutorController().handle);
routes.delete("/obra_autor/:id", new DeleteObraAutorController().handle);

routes.post(
    "/ppc_disciplina_versao",
    new CreatePpcDisciplinaVersaoController().handle
);
routes.put(
    "/ppc_disciplina_versao/:id",
    new UpdatePpcDisciplinaVersaoController().handle
);
routes.get(
    "/ppc_disciplina_versao/perfil/:perfil_id",
    new GetAllPpcDisciplinaVersoesController().handlePerfil
);
routes.get(
    "/ppc_disciplina_versao/competencia/:competencia_id",
    new GetAllPpcDisciplinaVersoesController().handleCompetencia
);
routes.get(
    "/ppc_disciplina_versao/:id",
    new GetOnePpcDisciplinaVersaoController().handle
);
routes.get(
    "/ppc_disciplina_versao",
    new GetAllPpcDisciplinaVersoesController().handle
);
routes.delete(
    "/ppc_disciplina_versao/:id",
    new DeletePpcDisciplinaVersaoController().handle
);

routes.post(
    "/perfil_ppc_disciplina_versao/:perfil_id",
    new CreatePerfilPpcDisciplinaVersaoController().handle
);
routes.post(
    "/competencia_ppc_disciplina_versao/:competencia_id",
    new CreateCompetenciaPpcDisciplinaVersaoController().handle
);
routes.delete(
    "/perfil_ppc_disciplina_versao/:perfil_id",
    new DeletePerfilPpcDisciplinaVersaoController().handle
);
routes.delete(
    "/competencia_ppc_disciplina_versao/:competencia_id",
    new DeleteCompetenciaPpcDisciplinaVersaoController().handle
);

routes.get("/calcpedido", new CalculoPedidoController().handle);
routes.post("/pedido", new CreatePedidoController().handle);
routes.post("/pedidos", new CreatePedidosController().handle);
routes.get("/pedido/:id", new GetOnePedidoController().handle);
routes.get("/pedido", new GetAllPedidosController().handle);
routes.delete("/pedido/:id", new DeletePedidoController().handle);

routes.post("/tipo_solicitacao", new CreateTipoSolicitacaoController().handle);
routes.put(
    "/tipo_solicitacao/:id",
    new UpdateTipoSolicitacaoController().handle
);
routes.get(
    "/tipo_solicitacao/:id",
    new GetOneTipoSolicitacaoController().handle
);
routes.get("/tipo_solicitacao", new GetAllTiposSolicitacaoController().handle);
routes.delete(
    "/tipo_solicitacao/:id",
    new DeleteTipoSolicitacaoController().handle
);

routes.post(
    "/componente_pedido",
    new CreateComponentePedidoController().handle
);
routes.put(
    "/componente_pedido/:id",
    new UpdateComponentePedidoController().handle
);
routes.get(
    "/componente_pedido/:id",
    new GetOneComponentePedidoController().handle
);
routes.get(
    "/componente_pedido",
    new GetAllComponentesPedidoController().handle
);
routes.delete(
    "/componente_pedido/:id",
    new DeleteComponentePedidoController().handle
);

routes.post(
    "/componente_pedido_versao",
    new CreateComponentePedidoVersaoController().handle
);
routes.put(
    "/componente_pedido_versao/:id",
    new UpdateComponentePedidoVersaoController().handle
);
routes.get(
    "/componente_pedido_versao/:id",
    new GetOneComponentePedidoVersaoController().handle
);
routes.get(
    "/componente_pedido_versao",
    new GetAllComponentePedidoVersoesController().handle
);
routes.delete(
    "/componente_pedido_versao/:id",
    new DeleteComponentePedidoVersaoController().handle
);

routes.post("/tipo_componente", new CreateTipoComponenteController().handle);
routes.put("/tipo_componente/:id", new UpdateTipoComponenteController().handle);
routes.get("/tipo_componente/:id", new GetOneTipoComponenteController().handle);
routes.get("/tipo_componente", new GetAllTiposComponentesController().handle);
routes.delete(
    "/tipo_componente/:id",
    new DeleteTipoComponenteController().handle
);

routes.post(
    "/trilha_componentes",
    new CreateTrilhaComponentesController().handle
);
routes.put(
    "/trilha_componentes/:id",
    new UpdateTrilhaComponentesController().handle
);
routes.get(
    "/trilha_componentes/:id",
    new GetOneTrilhaComponentesController().handle
);
routes.get(
    "/trilha_componentes",
    new GetAllTrilhaComponentesController().handle
);
routes.delete(
    "/trilha_componentes/:id",
    new DeleteTrilhaComponentesController().handle
);

routes.post(
    "/componente_trilha_componente",
    new CreateComponenteTrilhaComponentesController().handle
);
routes.put(
    "/componente_trilha_componente/:id",
    new UpdateComponenteTrilhaComponentesController().handle
);
routes.get(
    "/componente_trilha_componente/:id",
    new GetOneComponenteTrilhaComponentesController().handle
);
routes.get(
    "/componente_trilha_componente",
    new GetAllComponentesTrilhaComponentesController().handle
);
routes.delete(
    "/componente_trilha_componente/:id",
    new DeleteComponenteTrilhaComponentesController().handle
);

routes.post("/instituicao", new CreateInstituicaoController().handle);
routes.put("/instituicao/:id", new UpdateInstituicaoController().handle);
routes.get("/instituicao/:id", new GetOneInstituicaoController().handle);
routes.get("/instituicao", new GetAllInstituicoesController().handle);
routes.delete("/instituicao/:id", new DeleteInstituicaoController().handle);

export { routes };
