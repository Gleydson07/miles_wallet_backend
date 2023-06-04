import { Request, Response } from "express";
import { IWallet, WalletRepository } from "../../repositories/Wallets";

export class FindOneByKeysWalletController {
  async handle(request: Request, response: Response) {
    const dataParams: unknown = request.params;
    const dataQuery: unknown = request.query;
    const { accountId } = dataParams as Partial<IWallet>;
    const { bank_club_id, airline_club_id } = dataQuery as any;

    try {
      const instance = new WalletRepository();
      const result = await instance.findOneByKeysWalletService({
        accountId,
        bankClubId: bank_club_id || undefined,
        airlineClubId: airline_club_id || undefined
      });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}