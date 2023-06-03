import { Request, Response } from "express";
import { IUserCreate, UserRepository } from "../../repositories/Users";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { name, email, password } = data as IUserCreate;

    try {
      const instance = new UserRepository();
      const result = await instance.createUserService({
        name,
        email,
        password
      });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}