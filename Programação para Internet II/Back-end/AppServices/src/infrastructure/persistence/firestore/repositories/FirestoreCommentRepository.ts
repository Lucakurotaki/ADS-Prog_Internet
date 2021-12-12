import { db } from "..";
import { CommentRepository } from "../../../../application/repositories/CommentRepository";
import { Comment } from "../../../../domain/entities/Comment";
import { Id } from "../../../../domain/entities/Id";

export class FirestoreCommentRepository implements CommentRepository{
    private commentsRef = db.collection('comments');

    public async add(comment: Comment): Promise<Id>{

        const created = await this.commentsRef.add(comment);

        const createdId: Id = new Id();

        createdId.id = created.id;

        return createdId;
    }

    public async all(serviceId: Id): Promise<Comment[]>{
        
        const commentsDoc = await this.commentsRef.where('serviceId','==',serviceId.id).get();

        const comments = commentsDoc.docs.map(doc=>({id: doc.id, ...doc.data()}));

        return comments as Comment[];
    }

    public async change(comment: Comment, id: Id): Promise<object>{

        const changed = await this.commentsRef.doc(id.id).update(comment);

        return {id: id, time: changed.writeTime};
    }

    public async get(id: Id): Promise<Comment>{
        
        const comment = await this.commentsRef.doc(id.id).get();

        const gotten = comment.data() as Comment;

        gotten.id = id.id;

        return gotten;
    }
}