import { Request, Response } from "express";
import { IWallet, WalletRepository } from "../../repositories/Wallets";

export class DeleteWalletController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IWallet>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    try {
      const instance = new WalletRepository();
      const result = await instance.deleteWalletService({ id });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}