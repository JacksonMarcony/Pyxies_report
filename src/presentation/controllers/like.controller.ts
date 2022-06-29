import { LikeEntity } from "@/domain/entities/like.entity";
import { UserEntity } from "@/domain/entities/user.entity";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

export class LikeController {
  async counting(request: Request, response: Response) {
    const repository = getRepository(LikeEntity);

    const likes = repository.count({ where: "" });

    return response.json({ likes });
  }

  async registerLike(request: Request, response: Response) {
    const { problem_id } = request.body;

    const authMail = request.authMail;

    const repository = getRepository(LikeEntity);
    const repositoryUser = getRepository(UserEntity);

    const user = repositoryUser.findOne({ email: authMail });

    if (!user) {
      return response.status(400).json({ error: "This user is not exist." });
    }

    const liked = repository.create({
      user_id: user["id"],
      problem_id,
    });

    await repository.save(liked);

    repository.create({});
  }

  async deslike(request: Request, response: Response) {
    const { problem_id } = request.body;
    const authMail = request.authMail;

    const repository = getRepository(LikeEntity);
    const repositoryUser = getRepository(UserEntity);

    const user = repositoryUser.findOne({ email: authMail });

    if (!user) {
      return response.status(400).json({ error: "This user is not exist." });
    }

    repository.delete({ problem_id, user_id: user["id"] });

    return response.json({
      message: "This deslike register with successfully",
    });
  }
}
