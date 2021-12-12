import { Id } from "../../domain/entities/Id";
import { Service } from "../../domain/entities/Service";
import { ServiceRepository } from "../repositories/ServiceRespository";

interface GetServiceRequestModel{
    id: string;
}

export class GetServiceQuery{
    private serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository){
        this.serviceRepository = serviceRepository;
    }

    public async execute(request: GetServiceRequestModel): Promise<Service>{
        const reqId = request as Id;

        return this.serviceRepository.get(reqId);
    }
}