import { Request, Response } from "express";
import { CreateObraService } from "../../services/obra/CreateObraService";

export class CreateObraController {
    async handle(request: Request, response: Response) {
        const {
            item_tipo,
            obra_nome,
            serie_nome,
            colecao_nome,
            cidade,
            editora,
            ano,
            mes,
            dia,
            volume,
            edicao,
            resumo,
            periodico_nome,
            periodico_abreviacao,
            numero,
            paginas,
            idioma,
            doi,
            isbn,
            issn,
            url,
            acesso_em,
            contido_em,
            obraAutores,
        } = request.body;

        const service = new CreateObraService();

        const result = await service.execute({
            item_tipo,
            obra_nome,
            serie_nome,
            colecao_nome,
            cidade,
            editora,
            ano,
            mes,
            dia,
            volume,
            edicao,
            resumo,
            periodico_nome,
            periodico_abreviacao,
            numero,
            paginas,
            idioma,
            doi,
            isbn,
            issn,
            url,
            acesso_em,
            contido_em,
            obraAutores,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
