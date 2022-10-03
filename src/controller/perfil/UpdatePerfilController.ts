import { Request, Response } from "express";
import { UpdatePerfilService } from "../../services/perfil/UpdatePerfilService";

export class UpdatePerfilController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { ppc_id, perfil, perfilNumero, instituicao_id } = request.body;

        const service = new UpdatePerfilService();

        const result = await service.execute({
            id,
            ppc_id,
            perfil,
            perfilNumero,
            instituicao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
