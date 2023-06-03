import { Request, Response } from "express";
import { IAccount, AccountRepository } from "../../repositories/Accounts";

export class FindManyByUserIdAccountController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { userId } = data as Partial<IAccount>;

    try {
      const instance = new AccountRepository();
      const result = await instance.findManyByUserIdAccountService({ userId });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}