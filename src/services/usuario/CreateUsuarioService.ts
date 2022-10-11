import { isDate, isEmail, IsMobilePhone } from "class-validator";
import { getRepository } from "typeorm";
import { Usuario } from "../../entities/Usuario";
import { isCpf } from "iscpf";

type UsuarioRequest = {
    name: string;
    cpf: string;
    birthday: Date;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    complement?: string;
};

export class CreateUsuarioService {
    async execute({
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
    }: UsuarioRequest) {
        if (!name) {
            return new Error("Nome de usuário não inserido");
        }

        if (!email || !isEmail(email)) {
            return new Error("Insira um email válido");
        }

        if (!phone || !IsMobilePhone(phone, ["pt-BR"])) {
            return new Error("Insira um telefone válido");
        }

        if (!cpf || !isCpf(cpf)) {
            return new Error("Insira um CPF válido");
        }

        if (!birthday || !isDate(birthday)) {
            return new Error("Insira uma data de nascimento válida");
        }

        if (!address) {
            return new Error("Insira um endereço");
        }

        if (!city) {
            return new Error("Insira uma cidade");
        }

        if (!state) {
            return new Error("Insira um estado");
        }

        if (!country) {
            return new Error("Insira um país");
        }

        const repo = getRepository(Usuario);

        const emailAlreadyExists = await repo.findOne({ email });
        if (emailAlreadyExists) {
            return new Error("Email já cadastrado");
        }

        const usuario = repo.create({
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
        });

        await repo.save(usuario);

        return usuario;
    }
}
