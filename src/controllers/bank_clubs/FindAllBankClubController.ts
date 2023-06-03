import { Request, Response } from "express";
import { BankClubsRepository } from "../../repositories/BankClubs";

export class FindAllBankClubController {
  async handle(request: Request, response: Response) {
    const instance = new BankClubsRepository();
    const result = await instance.findAllBankClubService();

    return response.json(result);
  }
}