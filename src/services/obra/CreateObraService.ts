import { isNegative, isNumber } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";
import { CreateObraAutorService } from "../obra_autor/CreateObraAutorService";

type ObraAutor = {
    autor_id: string;
    funcao: string;
};

type ObraRequest = {
    item_tipo: string;
    obra_nome: string;
    serie_nome: string;
    colecao_nome: string;
    cidade: string;
    editora: string;
    ano: number;
    mes: string;
    dia: number;
    volume: string;
    edicao: string;
    resumo: string;
    periodico_nome: string;
    periodico_abreviacao: string;
    numero: string;
    paginas: string;
    idioma: string;
    doi: string;
    isbn: string;
    issn: string;
    url: string;
    acesso_em: string;
    contido_em: string;
    obraAutores?: ObraAutor[];
};

export class CreateObraService {
    async execute({
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
    }: ObraRequest) {
        if (!item_tipo) {
            return new Error("Tipo de item é obrigatório");
        }

        if (!obra_nome) {
            return new Error("Nome de obra é obrigatório");
        }

        if (dia && (!isNumber(dia) || isNegative(dia))) {
            return new Error("Insira um número válido em dia");
        }

        if (ano && (!isNumber(ano) || isNegative(ano))) {
            return new Error("Insira um número válido em ano");
        }

        const repo = getRepository(Obra);

        if (contido_em) {
            if (validate(contido_em)) {
                const idAux = await repo.findOne({ where: { id: contido_em } });
                if (!idAux) {
                    return new Error("ID de 'contido em' inexistente");
                }
            } else {
                return new Error("ID de 'contido em' inválido");
            }
        }

        const obra = repo.create({
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
        });

        await repo.save(obra);

        if (obraAutores.length) {
            for await (const obraAutor of obraAutores) {
                const service = new CreateObraAutorService();

                const result = await service.execute({
                    obra_id: obra.id,
                    autor_id: obraAutor.autor_id,
                    funcao: obraAutor.funcao,
                });

                if (result instanceof Error) {
                    return result;
                }
            }
        }

        return {
            ...obra,
            obraAutores,
        };
    }
}
