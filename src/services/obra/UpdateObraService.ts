import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";
import { CreateObraAutorService } from "../obra_autor/CreateObraAutorService";

type ObraAutores = {
    autor_id: string;
    obra_id: string;
    funcao: string;
};

type ObraUpdateRequest = {
    id: string;
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
    obraAutores?: ObraAutores[];
};

export class UpdateObraService {
    async execute({
        id,
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
    }: ObraUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (ano && !Number.isInteger(ano)) {
            return new Error("Insira um número válido em 'ano'");
        }

        if (dia && !Number.isInteger(dia)) {
            return new Error("Insira um número válido em 'dia'");
        }

        const repo = getRepository(Obra);
        const obra = await repo.findOne(id);
        if (!obra) {
            return new Error("Obra não existe!");
        }

        if (contido_em) {
            if (validate(contido_em)) {
                if (!(id == contido_em)) {
                    const idAux = await repo.findOne({
                        where: { id: contido_em },
                    });
                    if (!idAux) {
                        return new Error("ID de 'contido em' inexistente");
                    }
                } else {
                    return new Error(
                        "Não é possível editar uma obra e inseri-la nela mesma"
                    );
                }
            } else {
                return new Error("ID de 'contido em' inválido");
            }
        }

        obra.item_tipo = item_tipo ? item_tipo : obra.item_tipo;
        obra.obra_nome = obra_nome ? obra_nome : obra.obra_nome;
        obra.serie_nome = serie_nome ? serie_nome : obra.serie_nome;
        obra.colecao_nome = colecao_nome ? colecao_nome : obra.colecao_nome;
        obra.cidade = cidade ? cidade : obra.cidade;
        obra.editora = editora ? editora : obra.editora;
        obra.ano = ano ? ano : obra.ano;
        obra.mes = mes ? mes : obra.mes;
        obra.dia = dia ? dia : obra.dia;
        obra.volume = volume ? volume : obra.volume;
        obra.edicao = edicao ? edicao : obra.edicao;
        obra.resumo = resumo ? resumo : obra.resumo;
        obra.periodico_nome = periodico_nome
            ? periodico_nome
            : obra.periodico_nome;
        obra.periodico_abreviacao = periodico_abreviacao
            ? periodico_abreviacao
            : obra.periodico_abreviacao;
        obra.numero = numero ? numero : obra.numero;
        obra.paginas = paginas ? paginas : obra.paginas;
        obra.idioma = idioma ? idioma : obra.idioma;
        obra.doi = doi ? doi : obra.doi;
        obra.isbn = isbn ? isbn : obra.isbn;
        obra.issn = issn ? issn : obra.issn;
        obra.url = url ? url : obra.url;
        obra.acesso_em = acesso_em ? acesso_em : obra.acesso_em;
        obra.contido_em = contido_em ? contido_em : obra.contido_em;

        await repo.save(obra);

        if (obraAutores) {
            for await (const obraAutor of obraAutores) {
                const service = new CreateObraAutorService();

                const result = await service.execute({
                    autor_id: obraAutor.autor_id,
                    obra_id: obra.id,
                    funcao: obraAutor.funcao,
                });

                if (result instanceof Error) {
                    return result;
                }
            }
        }

        return obra;
    }
}
