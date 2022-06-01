import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";

type ObraUpdateRequest = {
    id: string;
    item_tipo: string;
    obra_nome: string;
    capitulo_nome: string;
    serie_nome: string;
    organizador_editor_nome: string;
    funcao: string;
    cidade: string;
    editora: string;
    ano: string;
    mes: string;
    dia: string;
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
    acesso_em: string;
    contido_em: string;
};

export class UpdateObraService {
    async execute ({
        id,
        item_tipo,
        obra_nome,
        capitulo_nome,
        serie_nome,
        organizador_editor_nome,
        funcao,
        cidade,
        editora,
        ano,
        mes,
        dia,
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
        acesso_em,
        contido_em
    }: ObraUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Obra);

        const obra = await repo.findOne(id);

        if (!obra) {
            return new Error("Obra não existe!");
        }

        obra.item_tipo = item_tipo ? item_tipo : obra.item_tipo;
        obra.obra_nome = obra_nome ? obra_nome : obra.obra_nome;
        obra.capitulo_nome = capitulo_nome ? capitulo_nome : obra.capitulo_nome;
        obra.serie_nome = serie_nome ? serie_nome : obra.serie_nome;
        obra.organizador_editor_nome = organizador_editor_nome ? organizador_editor_nome : obra.organizador_editor_nome;
        obra.funcao = funcao ? funcao : obra.funcao;
        obra.cidade = cidade ? cidade : obra.cidade;
        obra.editora = editora ? editora : obra.editora;
        obra.ano = ano ? ano : obra.ano;
        obra.mes = mes ? mes : obra.mes;
        obra.dia = dia ? dia : obra.dia;
        obra.edicao = edicao ? edicao : obra.edicao;
        obra.resumo = resumo ? resumo : obra.resumo;
        obra.periodico_nome = periodico_nome ? periodico_nome : obra.periodico_nome;
        obra.periodico_abreviacao = periodico_abreviacao ? periodico_abreviacao : obra.periodico_abreviacao;
        obra.numero = numero ? numero : obra.numero;
        obra.paginas = paginas ? paginas : obra.paginas;
        obra.idioma = idioma ? idioma : obra.idioma;
        obra.doi = doi ? doi : obra.doi;
        obra.isbn = isbn ? isbn : obra.isbn;
        obra.issn = issn ? issn : obra.issn;
        obra.acesso_em = acesso_em ? acesso_em : obra.acesso_em;
        obra.contido_em = contido_em ? contido_em : obra.contido_em;

        await repo.save(obra);

        return obra;
    }
}