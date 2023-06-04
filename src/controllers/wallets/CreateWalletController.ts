import { Request, Response } from "express";
import { IWalletCreate, WalletRepository } from "../../repositories/Wallets";

export class CreateWalletController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { 
      name,
      description,
      balance,
      accountId,
      bankClubId,
      airlineClubId
     } = data as IWalletCreate;
    
    try {
      const instance = new WalletRepository();
      const result = await instance.createWalletService({
        name,
        description,
        balance,
        accountId,
        bankClubId,
        airlineClubId
      });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}