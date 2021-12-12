import { Comment } from "../../domain/entities/Comment";
import { Id } from "../../domain/entities/Id";
import { CommentRepository } from "../repositories/CommentRepository";

interface GetCommentRequestModel{
    id: string;
}

export class GetCommentQuery{
    private commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository){
        this.commentRepository = commentRepository;
    }

    public async execute(request: GetCommentRequestModel): Promise<Comment>{
        const reqId = request as Id;

        return this.commentRepository.get(reqId);
    }
}