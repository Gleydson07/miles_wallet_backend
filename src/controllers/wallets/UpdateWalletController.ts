import { Request, Response } from "express";
import { IWallet, WalletRepository } from "../../repositories/Wallets";

export class UpdateWalletController {
  async handle(request: Request, response: Response) {
    const dataParams: unknown = request.params;
    const dataBody: unknown = request.body;
    
    const { id } = dataParams as Partial<IWallet>;
    const { name, description } = dataBody as Partial<IWallet>;

    try {
      const instance = new WalletRepository();
      const result = await instance.updateWalletService({ id, name, description });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}