import { Request, Response } from "express";
import { IBankClubCreate, BankClubsRepository } from "../../repositories/BankClubs";

export class CreateBankClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { name, website, phone } = data as IBankClubCreate;

    try {
      const instance = new BankClubsRepository();
      const result = await instance.createBankClubService({
        name,
        website,
        phone
      });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}