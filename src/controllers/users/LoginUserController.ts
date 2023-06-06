import { Request, Response } from "express";
import { IUserCreate, UserRepository } from "../../repositories/Users";

export class LoginUserController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { email, password } = data as Partial<IUserCreate>;

    try {
      const instance = new UserRepository();
      const result = await instance.loginService({
        email: email!,
        password: password!
      });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}