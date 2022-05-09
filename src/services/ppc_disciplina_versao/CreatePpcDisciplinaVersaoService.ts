import { getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";
import { Ppc } from "../../entities/Ppc";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";


type PpcDisciplinaVersaoRequest = {
    ppc_id: string;
    disciplina_id: string;
    modulo: string;
    semestre: string;
}

export class CreatePpcDisciplinaVersaoService {
    async execute ({ppc_id, disciplina_id, modulo, semestre}: PpcDisciplinaVersaoRequest) {
        const repo = getRepository(PpcDisciplinaVersao);
        const repoPpc = getRepository(Ppc);
        const repoDisciplina = getRepository(Disciplina);

        const ppc = await repoPpc.findOne(ppc_id);
        const disciplina = await repoDisciplina.findOne(disciplina_id);

        if(!ppc) {
            return new Error("Ppc não existe!");
        }

        if(!disciplina) {
            return new Error("Disciplina não existe!");
        }

        const ppcDisciplinaVersao = repo.create({ppc_id, disciplina_id, modulo, semestre});
        
        await repo.save(ppcDisciplinaVersao);

        return {
            ...ppc, ppc, disciplina
        }
    }
}