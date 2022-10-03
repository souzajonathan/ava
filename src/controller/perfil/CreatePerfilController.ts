import { Request, Response } from "express";
import { CreatePerfilService } from "../../services/perfil/CreatePerfilService";

export class CreatePerfilController {
    async handle(request: Request, response: Response) {
        const { ppc_id, perfil, perfilNumero, instituicao_id } = request.body;

        const service = new CreatePerfilService();

        const result = await service.execute({
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
