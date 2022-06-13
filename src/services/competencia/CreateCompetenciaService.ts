import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { Ppc } from "../../entities/Ppc";

type CompetenciaRequest = {
    ppc_id: string;
    competencia: string;
    competenciaNumero: string;
}

export class CreateCompetenciaService {
    async execute({ ppc_id, competencia, competenciaNumero }: CompetenciaRequest) {
        if(!ppc_id || !competencia || !competenciaNumero){
            return new Error("Preencha os itens obrigatórios");
        }
        
        if(!validate(ppc_id)){
            return new Error("ID de PPC inválido");
        }

        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if(!ppc) {
            return new Error("Ppc não existe!");
        }
        
        const repo = getRepository(CompetenciasHabilidades);
        const competHabilidades = repo.create({
            ppc_id,
            competencia,
            competenciaNumero
        });

        await repo.save(competHabilidades);

        return {
            ...competHabilidades, ppc
        };
    }

}