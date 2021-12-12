import { ServiceRepository } from "../repositories/ServiceRespository";
import { Service } from "../../domain/entities/Service";
import { Id } from "../../domain/entities/Id";


interface CreateServiceRequestModel{
    titulo: string
    descricao: string
    orcamento: Number
    dtcadastro: Date
    dtlimite: Date
    situacao: string
}


export class CreateServiceCommand{
    private serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository){
        this.serviceRepository = serviceRepository;
    }

    public async execute(request: CreateServiceRequestModel): Promise<Id>{
        const newService = request as Service;

        const id = this.serviceRepository.create(newService);

        return id;
    }
}