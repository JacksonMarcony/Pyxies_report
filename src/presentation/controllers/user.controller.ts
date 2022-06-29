import { UserEntity } from "../../domain/entities/user.entity";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { compare, hash } from "bcrypt";
import { generateToken } from "../../utils/jwt";

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

      const token = generateToken(user.email, user.id);

      return response
        .status(201)
        .json({ message: "User created with successfully", token });
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

      const token = generateToken(
        userAlreadyExists.email,
        userAlreadyExists.id
      );

      return response.json({ token });
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
