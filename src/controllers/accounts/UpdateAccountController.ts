import { Request, Response } from "express";
import { IAccount, AccountRepository } from "../../repositories/Accounts";

export class UpdateAccountController {
  async handle(request: Request, response: Response) {
    const dataParams: unknown = request.params;
    const dataBody: unknown = request.body;
    
    const { id } = dataParams as Partial<IAccount>;
    const { name, description } = dataBody as Partial<IAccount>;

    try {
      const instance = new AccountRepository();
      const result = await instance.updateAccountService({ id, name, description });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}