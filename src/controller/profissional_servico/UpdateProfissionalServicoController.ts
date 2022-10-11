import { Request, Response } from "express";
import { UpdateProfissionalServicoService } from "../../services/profissional_servico/UpdateProfissionalServicoService";

export class UpdateProfissionalServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            servico_id,
            profissional_id,
            data_prazo,
            data_entrega,
            convite,
            aceite,
            contrato,
            entrega,
            check,
            ajuste,
            aprovacao_servico,
            fechado,
            pagamento,
            valor_orcado,
            valor_pago,
            observacao,
        } = request.body;

        const service = new UpdateProfissionalServicoService();

        const result = await service.execute({
            id,
            servico_id,
            profissional_id,
            data_prazo,
            data_entrega,
            convite,
            aceite,
            contrato,
            entrega,
            check,
            ajuste,
            aprovacao_servico,
            fechado,
            pagamento,
            valor_orcado,
            valor_pago,
            observacao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
