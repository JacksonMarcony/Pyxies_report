import { UserEntity } from "../../domain/entities/user.entity";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, registry, isVerify, password } = request.body;
      const repository = getRepository(UserEntity);

      const userAlreadyExists = await repository.findOne({ email });
      if (userAlreadyExists) {
        throw new Error("Este usuário já existe!");
      }

      const passwordHash = await hash(password, 8);

      const user = repository.create({
        name,
        email,
        registry,
        password: passwordHash,
        isVerify,
      });

      await repository.save(user);

      return response.json(user);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const repository = getRepository(UserEntity);

      const userAlreadyExists = await repository.findOne({ email });

      if (!userAlreadyExists) {
        throw new Error("User or password incorrect!");
      }

      const passwordMatch = await compare(password, userAlreadyExists.password);

      if (!passwordMatch) {
        throw new Error("User or password incorrect!");
      }

      const token = sign(
        {
          subject: userAlreadyExists.email,
        },
        "3f70b5ad-5907-4fa2-8599-f6fbb73f3063",
        {
          expiresIn: "20s",
          subject: String(userAlreadyExists.id),
        }
      );

      return response.json({ token });
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
