import { getRepository } from "typeorm";
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
        console.log(disciplina.sigla);

        if(!disciplina) {
            return new Error("Disciplina não existe!");
        }

        const disciplina_versao_nome = disciplina.sigla;

        if(!disciplina_versao_nome){
            return new Error("Disciplina sem sigla");
        }

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