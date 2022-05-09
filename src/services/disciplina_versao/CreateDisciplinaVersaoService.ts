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
        const repoVersaoDisciplina = getRepository(DisciplinaVersao);

        const disciplina = await repoDisciplina.findOne(disciplina_id);

        if(!disciplina) {
            return new Error("Disciplina não existe!");
        }

        const name = disciplina.name;

        const pontosDecortes = Math.round(name.length/5);

        const nomeBase = ["L", "U", "N", "A"];

        for(let idx = 0; idx < 4; idx++){
            if (name[idx*pontosDecortes] != undefined && name[idx*pontosDecortes] != " "){
                nomeBase[idx] = name[idx*pontosDecortes]
            }
        }

        let versoesExistentesQuant = 1;

        const versoesExistentes = await repoVersaoDisciplina.count({where: {disciplina_id}});

        if(versoesExistentes !== null){
           versoesExistentesQuant = versoesExistentes+1;
        }

        const disciplina_versao_nome = nomeBase[0]+nomeBase[1]+nomeBase[2]+nomeBase[3]+versoesExistentesQuant+"-"+credito_quantidade;
        console.log(disciplina_versao_nome);

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