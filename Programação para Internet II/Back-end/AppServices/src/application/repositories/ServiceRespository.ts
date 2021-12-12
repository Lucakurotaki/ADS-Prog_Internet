import { Id } from "../../domain/entities/Id";
import { Service } from "../../domain/entities/Service";

export interface ServiceRepository{
    all(): Promise<Service[]>
    create(obj: Service): Promise<Id>
    change(obj: Service, id: Id): Promise<object>
    get(id: Id): Promise<Service>;
}