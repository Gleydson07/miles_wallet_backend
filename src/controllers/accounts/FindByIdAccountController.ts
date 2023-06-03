import { Request, Response } from "express";
import { IAccount, AccountRepository } from "../../repositories/Accounts";

export class FindByIdAccountController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAccount>;

    try {
      const instance = new AccountRepository();
      const result = await instance.findByIdAccountService({ id });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}