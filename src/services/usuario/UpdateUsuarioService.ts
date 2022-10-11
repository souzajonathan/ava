import { isDate, isEmail, IsMobilePhone } from "class-validator";
import { isCpf } from "iscpf";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Usuario } from "../../entities/Usuario";

type UsuarioUpdateRequest = {
    id: string;
    name?: string;
    cpf?: string;
    birthday?: Date;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    complement?: string;
};

export class UpdateUsuarioService {
    async execute({
        id,
        name,
        cpf,
        birthday,
        email,
        phone,
        address,
        city,
        state,
        country,
        complement,
    }: UsuarioUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (email && !isEmail(email)) {
            return new Error("Insira um email válido");
        }

        if (phone && !IsMobilePhone(phone, ["pt-BR"])) {
            return new Error("Insira um telefone válido");
        }

        if (cpf && !isCpf(cpf)) {
            return new Error("Insira um CPF válido");
        }

        if (birthday && !isDate(birthday)) {
            return new Error("Insira uma data de nascimento válida");
        }

        const repo = getRepository(Usuario);
        const usuario = await repo.findOne(id);
        if (!usuario) {
            return new Error("Usuário não existe!");
        }

        const emailAlreadyExists = await repo.findOne({ email });
        if (emailAlreadyExists && emailAlreadyExists.name != usuario.name) {
            return new Error("Email já cadastrado");
        }

        usuario.name = name ? name : usuario.name;
        usuario.cpf = cpf ? cpf : usuario.cpf;
        usuario.birthday = birthday ? birthday : usuario.birthday;
        usuario.email = email ? email : usuario.email;
        usuario.phone = phone ? phone : usuario.phone;
        usuario.address = address ? address : usuario.address;
        usuario.city = city ? city : usuario.city;
        usuario.state = state ? state : usuario.state;
        usuario.country = country ? country : usuario.country;
        usuario.complement = complement ? complement : usuario.complement;

        await repo.save(usuario);

        return usuario;
    }
}
