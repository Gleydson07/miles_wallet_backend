import { Request, Response } from "express";
import { IAccountCreate, AccountRepository } from "../../repositories/Accounts";

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { name, description, userId } = data as IAccountCreate;
    
    try {
      const instance = new AccountRepository();
      const result = await instance.createAccountService({
        name,
        description,
        userId
      });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}