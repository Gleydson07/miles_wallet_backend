import { Request, Response } from "express";
import { IWallet, WalletRepository } from "../../repositories/Wallets";

export class FindByIdWalletController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IWallet>;

    try {
      const instance = new WalletRepository();
      const result = await instance.findByIdWalletService({ id });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}