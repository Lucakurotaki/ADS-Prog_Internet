import { Comment } from "../../domain/entities/Comment";
import { Id } from "../../domain/entities/Id";
import { CommentRepository } from "../repositories/CommentRepository";

interface UpdateCommentRequestModel{
    id: string;
    serviceId: string;
    conteudo: string;
}

export class UpdateCommentCommand{
    private commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository){
        this.commentRepository = commentRepository;
    }

    public async execute(request: UpdateCommentRequestModel): Promise<object>{

        const modifiedComment = request as Comment;

        const reqId = {id: request.id} as Id;

        const id = this.commentRepository.change(modifiedComment, reqId);

        return id;
    }
}