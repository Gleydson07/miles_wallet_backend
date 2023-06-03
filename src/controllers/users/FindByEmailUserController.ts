import { Request, Response } from "express";
import { IUser, UserRepository } from "../../repositories/Users";

export class FindByEmailUserController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { email } = data as Partial<IUser>;

    const instance = new UserRepository();
    const result = await instance.findByEmailUserService({ email });

    return response.json(result);
  }
}