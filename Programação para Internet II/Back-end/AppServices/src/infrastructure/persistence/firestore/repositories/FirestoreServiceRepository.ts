import { db } from "..";
import { ServiceRepository } from "../../../../application/repositories/ServiceRespository";
import { Id } from "../../../../domain/entities/Id";
import { Service } from "../../../../domain/entities/Service";

export class FirestoreServiceRespository implements ServiceRepository{
    private servicesRef = db.collection('services');

    public async all(): Promise<Service[]>{

        const servicesDoc = await this.servicesRef.get();

        const services = servicesDoc.docs.map(doc=>({id: doc.id, ...doc.data()}));

        return services as Service[];
    }

    public async create(service: Service): Promise<Id>{

        const created = await this.servicesRef.add(service);

        const createdId: Id = new Id();

        createdId.id = created.id;

        return createdId;
    }

    public async change(service: Service, id: Id): Promise<object>{

        const changed = await this.servicesRef.doc(id.id).update(service);

        return {id: id, time: changed.writeTime};
    }

    public async get(id: Id): Promise<Service>{
        
        const service = await this.servicesRef.doc(id.id).get();

        const gotten = {id: service.id, ...service.data()};

        return gotten as Service;
    }
}