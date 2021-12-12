import { Request, Response } from "express";
import {CreateServiceCommand} from '../../application/command/CreateServiceCommand';
import { UpdateServiceCommand } from "../../application/command/UpdateServiceCommand";
import { GetAllServicesQuery } from "../../application/query/GetAllServicesQuery";
import { GetServiceQuery } from "../../application/query/GetServiceQuery";
import { FirestoreServiceRespository } from "../../infrastructure/persistence/firestore/repositories/FirestoreServiceRepository";

export class ServiceController{

    public async getAll(req: Request, res: Response): Promise<Response>{

        const repoService = new FirestoreServiceRespository();

        const query = new GetAllServicesQuery(repoService);

        const services = await query.execute();

        return res.json(services);
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const {titulo, descricao, orcamento, dtcadastro, dtlimite} = req.body;

        const repoService = new FirestoreServiceRespository();

        const command = new CreateServiceCommand(repoService);

        const serviceId = await command.execute({titulo, descricao, orcamento, dtcadastro, dtlimite, situacao: 'Aberto'});

        return res.status(201).json({id: serviceId.id});
    }

    public async change(req: Request, res: Response): Promise<Response>{
        const reqId = req.params.id;

        const {id = reqId, titulo, descricao, orcamento, dtcadastro, dtlimite, situacao} = req.body;

        const repoService = new FirestoreServiceRespository();

        const command = new UpdateServiceCommand(repoService);

        const serviceId = await command.execute({id, titulo, descricao, orcamento, dtcadastro, dtlimite, situacao});

        return res.status(200).json(serviceId);
    }

    public async get(req: Request, res: Response): Promise<Response>{
        const reqId = req.params.id;

        const repoService = new FirestoreServiceRespository();

        const query = new GetServiceQuery(repoService);

        const service = await query.execute({id: reqId});

        return res.json(service);
    }
}