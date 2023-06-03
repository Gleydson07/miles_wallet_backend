import { Request, Response } from "express";
import { IBankClub, BankClubsRepository } from "../../repositories/BankClubs";

export class FindByIdBankClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IBankClub>;

    try {
      const instance = new BankClubsRepository();
      const result = await instance.findByIdBankClubService({ id });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}