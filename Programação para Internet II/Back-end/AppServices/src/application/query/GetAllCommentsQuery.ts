import { CommentRepository } from "../repositories/CommentRepository";
import { Comment } from "../../domain/entities/Comment";
import { Id } from "../../domain/entities/Id";

interface GetAllCommentsRequestModel{
    id: string;
}

export class GetAllCommentsQuery {
    private commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository){
        this.commentRepository = commentRepository;
    }

    public async execute(request: GetAllCommentsRequestModel): Promise<Comment[]>{
        const reqId = request as Id
        return this.commentRepository.all(reqId);
    }
}