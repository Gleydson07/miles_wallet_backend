import { Request, Response } from "express";
import { IBankClub, BankClubsRepository } from "../../repositories/BankClubs";

export class DisableBankClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IBankClub>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    const instance = new BankClubsRepository();
    const result = await instance.disableBankClubService({ id });

    return response.json( result );
  }
}