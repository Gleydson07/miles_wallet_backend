import { Request, Response } from "express";
import { IUser, UserRepository } from "../../repositories/Users";

export class UpdatePasswordUserController {
  async handle(request: Request, response: Response) {
    const dataParams: unknown = request.params;
    const dataBody: unknown = request.body;
    
    const { email } = dataParams as Partial<IUser>;
    const { password } = dataBody as Partial<IUser>;

    const instance = new UserRepository();
    const result = await instance.updatePasswordUserService({ email, password });

    return response.json(result);
  }
}