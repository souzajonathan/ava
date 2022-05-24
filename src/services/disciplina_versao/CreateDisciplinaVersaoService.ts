import { FindConditions, getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

type DisciplinaVersaoRequest = {
    disciplina_id: string;
    codigo: string;
    credito_quantidade: number;
    ementa: string;
    bibliografia_basica: string;
    comp_bibliografia: string;
    observacao: string;
    em_oferta: number;
    produzido: number;
};

export class CreateDisciplinaVersaoService {
    async execute({
        disciplina_id,
        codigo,
        credito_quantidade,
        ementa,
        bibliografia_basica,
        comp_bibliografia,
        observacao,
        em_oferta,
        produzido
    }: DisciplinaVersaoRequest) {
        const repo = getRepository(DisciplinaVersao);
        const repoDisciplina = getRepository(Disciplina);

        const disciplina = await repoDisciplina.findOne(disciplina_id);

        const where: FindConditions<DisciplinaVersao> = {};
        where.disciplina_id = disciplina_id;
        const numeroVersao = await repo.count({where});

        if(!disciplina) {
            return new Error("Disciplina não existe!");
        }

        if(!disciplina.sigla){
            return new Error("Disciplina sem sigla");
        }

        const disciplina_versao_nome = `${disciplina.sigla}${credito_quantidade}-${numeroVersao+1}`;

        const disciplinaVersao = repo.create({
            disciplina_id,
            disciplina_versao_nome,
            codigo,
            credito_quantidade,
            ementa,
            bibliografia_basica,
            comp_bibliografia,
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