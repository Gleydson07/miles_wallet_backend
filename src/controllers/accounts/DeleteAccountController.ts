import { Request, Response } from "express";
import { IAccount, AccountRepository } from "../../repositories/Accounts";

export class DeleteAccountController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAccount>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    try {
      const instance = new AccountRepository();
      const result = await instance.deleteAccountService({ id });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}