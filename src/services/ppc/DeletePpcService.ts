import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Ppc } from "../../entities/Ppc";

export class DeletePpcService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Ppc);
        /* const repoCompet = getRepository(CompetHabilidades);
        const repoPerf = getRepository(PerfilEgresso);
        
        if(!(await repo.findOne(id))){
            return new Error("Ppc não existe!");
        }

        if(await repoCompet.findOne({where: {ppc_id : id}})){
            return new Error("PPC com competências cadastradas");
        }
        
        if(await repoPerf.findOne({where: {ppc_id : id}})){
            return new Error("PPC com perfis cadastrados");
        } */

        await repo.delete(id);
    }
}