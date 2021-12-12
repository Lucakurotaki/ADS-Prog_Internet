import { GetAllCommentsQuery } from "../../application/query/GetAllCommentsQuery";
import { FirestoreCommentRepository } from "../../infrastructure/persistence/firestore/repositories/FirestoreCommentRepository";
import { Request, Response } from "express";
import { AddCommentCommand } from "../../application/command/AddCommentCommand";
import { UpdateCommentCommand } from "../../application/command/UpdateCommentCommand";
import { GetCommentQuery } from "../../application/query/GetCommentQuery";

export class CommentController{

    public async getAll(req: Request, res: Response): Promise<Response>{

        const reqId = req.params['serviceid'];

        const repoComment = new FirestoreCommentRepository();

        const query = new GetAllCommentsQuery(repoComment);

        const comments = await query.execute({id: reqId});

        return res.json(comments);
    }

    public async add(req: Request, res: Response): Promise<Response>{

        const {serviceId = req.params['serviceid'], conteudo} = req.body;

        const repoComment = new FirestoreCommentRepository();

        const command = new AddCommentCommand(repoComment);

        const commentId = await command.execute({serviceId, conteudo});

        return res.status(201).json({id: commentId.id});
    }

    public async get(req: Request, res: Response): Promise<Response>{

        const reqId = req.params['id'];

        const repoComment = new FirestoreCommentRepository();

        const query = new GetCommentQuery(repoComment);

        const comment = await query.execute({id: reqId});

        return res.json(comment);
    }

    public async change(req: Request, res: Response): Promise<Response>{

        const reqId = req.params['id'];

        const {id = reqId, serviceId, conteudo} = req.body;

        const repoComment = new FirestoreCommentRepository();

        const command = new UpdateCommentCommand(repoComment);

        const commentId = await command.execute({id, serviceId, conteudo});

        return res.status(200).json(commentId);
    }
}