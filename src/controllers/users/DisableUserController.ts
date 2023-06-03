import { Request, Response } from "express";
import { IUser, UserRepository } from "../../repositories/Users";

export class DisableUserController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IUser>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    const instance = new UserRepository();
    const result = await instance.disableUserService({ id });

    return response.json( result );
  }
}