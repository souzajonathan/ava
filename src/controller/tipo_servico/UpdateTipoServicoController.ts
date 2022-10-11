import { Request, Response } from "express";
import { UpdateTipoServicoService } from "../../services/tipo_servico/UpdateTipoServicoService";

export class UpdateTipoServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { nome, descricao, valor, unidade_medida, aprovacao } =
            request.body;

        const service = new UpdateTipoServicoService();

        const result = await service.execute({
            id,
            nome,
            descricao,
            valor,
            unidade_medida,
            aprovacao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
