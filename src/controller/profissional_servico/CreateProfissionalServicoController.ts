import { Request, Response } from "express";
import { CreateProfissionalServicoService } from "../../services/profissional_servico/CreateProfissionalServicoService";

export class CreateProfissionalServicoController {
    async handle(request: Request, response: Response) {
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

        const service = new CreateProfissionalServicoService();

        const result = await service.execute({
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
