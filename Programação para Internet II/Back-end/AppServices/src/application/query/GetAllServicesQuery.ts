import { Service } from "../../domain/entities/Service";
import { ServiceRepository } from "../repositories/ServiceRespository";

export class GetAllServicesQuery {
    private serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository){
        this.serviceRepository = serviceRepository;
    }

    public async execute(): Promise<Service[]>{
        return this.serviceRepository.all();
    }
}