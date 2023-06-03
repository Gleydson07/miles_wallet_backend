import { Request, Response } from "express";
import { IUser, UserRepository } from "../../repositories/Users";

export class EnableUserController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IUser>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    const instance = new UserRepository();
    const result = await instance.enableUserService({ id });

    return response.json( result );
  }
}