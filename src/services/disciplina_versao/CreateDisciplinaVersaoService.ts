import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

type DisciplinaVersaoRequest = {
    disciplina_id: string;
    codigo: string;
    credito_quantidade: number;
    ementa: string;
    observacao: string;
    em_oferta: boolean;
    produzido: boolean;
};

export class CreateDisciplinaVersaoService {
    async execute({
        disciplina_id,
        codigo,
        credito_quantidade,
        ementa,
        observacao,
        em_oferta,
        produzido
    }: DisciplinaVersaoRequest) {
        if(!disciplina_id || !codigo || !credito_quantidade || !ementa || em_oferta === undefined || produzido === undefined){
            return new Error("Insira todos os itens obrigatórios");
        }

        if(!Number.isInteger(credito_quantidade)){
            return new Error("Insira um número válido em 'crédito quantidade'");
        }

        if(typeof em_oferta != "boolean"){
            return new Error("Marcação para 'em oferta' inválido");
        }

        if(typeof produzido != "boolean"){
            return new Error("Marcação para 'produzido' inválido");
        }

        if(!validate(disciplina_id)){
            return new Error("ID de disciplina inválido");
        }
        const repoDisciplina = getRepository(Disciplina);
        const disciplina = await repoDisciplina.findOne(disciplina_id);
        if(!disciplina) {
            return new Error("Disciplina não existe!");
        }

        const repo = getRepository(DisciplinaVersao);
        const where: FindConditions<DisciplinaVersao> = {};
        where.disciplina_id = disciplina_id;
        const numeroVersao = await repo.count({where});

        /* if(!disciplina.sigla){
            return new Error("Disciplina sem sigla");
        } */

        const disciplina_versao_nome = `${disciplina.sigla}${credito_quantidade}-${numeroVersao+1}`;

        const disciplinaVersao = repo.create({
            disciplina_id,
            disciplina_versao_nome,
            codigo,
            credito_quantidade,
            ementa,
            observacao,
            em_oferta,
            produzido
        });

        await repo.save(disciplinaVersao);

        return {
            ...disciplinaVersao, disciplina
        };
    }

}