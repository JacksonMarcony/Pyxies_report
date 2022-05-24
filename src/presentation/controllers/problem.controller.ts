import { ProblemEntity } from "../../domain/entities/problem.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

export class ProblemController {
  async create(request: Request, response: Response) {
    try {
      const { description, department, email } = request.body;

      const repository = getRepository(ProblemEntity);
      const repositoryUser = getRepository(UserEntity);

      const userAlreadyExists = await repositoryUser.findOne({ email });
      if (!userAlreadyExists) {
        throw new Error("This user does not exist.");
      }
      const filename = request.file.filename;

      const problem = repository.create({
        description: description,
        file: filename,
        accepted: false,
        department,
        user_id: userAlreadyExists.id
      });

      await repository.save(problem);

      return response.json(problem);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
