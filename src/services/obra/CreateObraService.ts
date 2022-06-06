import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";

type ObraRequest = {
    item_tipo: string;
    obra_nome: string;
    capitulo_nome: string;
    serie_nome: string;
    colecao_nome: string;
    organizador_editor_nome: string;
    funcao: string;
    cidade: string;
    editora: string;
    ano: string;
    mes: string;
    dia: string;
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
};

export class CreateObraService {
    async execute({
        item_tipo,
        obra_nome,
        capitulo_nome,
        serie_nome,
        colecao_nome,
        organizador_editor_nome,
        funcao,
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
        contido_em
    }: ObraRequest): Promise< Obra | Error > {
        const repo = getRepository(Obra);

        if(contido_em){
            if(validate(contido_em)){
                const idAux = await repo.findOne({where: {id: contido_em}});
                if(!idAux){
                    return new Error("ID de 'contido em' inexistente");
                }
            }
            else{
                return new Error("ID de 'contido em' inválido");
            }
        }

        const obra = repo.create({
            item_tipo,
            obra_nome,
            capitulo_nome,
            serie_nome,
            colecao_nome,
            organizador_editor_nome,
            funcao,
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
            contido_em
        });

        await repo.save(obra);

        return obra;
    }

}