import { Comment } from "../../domain/entities/Comment";
import { Id } from "../../domain/entities/Id";
import { CommentRepository } from "../repositories/CommentRepository";

interface AddCommentRequestModel{
    serviceId: string;
    conteudo: string;
}

export class AddCommentCommand{
    private commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository){
        this.commentRepository = commentRepository;
    }

    public async execute(request: AddCommentRequestModel): Promise<Id>{
        const newComment = request as Comment;

        const id = this.commentRepository.add(newComment);

        return id;
    }
}