import { Comment } from "../../domain/entities/Comment";
import { Id } from "../../domain/entities/Id";

export interface CommentRepository {
    add(obj: Comment): Promise<Id>;
    all(serviceId: Id): Promise<Comment[]>;
    change(obj: Comment, id: Id): Promise<object>;
    get(id: Id): Promise<Comment>;
}