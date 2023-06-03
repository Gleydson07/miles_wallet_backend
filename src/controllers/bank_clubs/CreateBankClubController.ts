import { Request, Response } from "express";
import { IBankClubCreate, BankClubsRepository } from "../../repositories/BankClubs";

export class CreateBankClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { name, website, phone } = data as IBankClubCreate;

    const instance = new BankClubsRepository();
    const result = await instance.createBankClubService({
      name,
      website,
      phone
    });

    return response.json(result);
  }
}