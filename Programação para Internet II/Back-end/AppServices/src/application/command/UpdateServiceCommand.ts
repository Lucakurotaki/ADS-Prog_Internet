import { ServiceRepository } from "../repositories/ServiceRespository";
import { Service } from "../../domain/entities/Service";
import { Id } from "../../domain/entities/Id";

interface UpdateServiceRequestModel{
    id: string;
    titulo?: string;
    descricao?: string;
    orcamento?: Number;
    dtcadastro?: Date;
    dtlimite?: Date;
    situacao?: string;
}

export class UpdateServiceCommand{
    private serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository){
        this.serviceRepository = serviceRepository;
    }

    public async execute(request: UpdateServiceRequestModel): Promise<object>{
        const modifiedService = request as Service;

        const reqId = {id: request.id} as Id;
        
        const id = this.serviceRepository.change(modifiedService, reqId);

        return id;
    }
}