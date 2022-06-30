import { AdmDepartmentEntity } from "@/domain/entities/problem.entity";
import { Request, Response } from "express";

export class SolutionController {
    async create(request: Request, response: Response) {
        const { solution, email, problem } = request.body;

        
    }
}