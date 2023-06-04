import { Request, Response } from "express";
import { IWalletTypeCreate, WalletTypeRepository } from "../../repositories/WalletTypes";

export class CreateWalletTypeController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { 
      name,
      description
     } = data as IWalletTypeCreate;
    
    try {
      const instance = new WalletTypeRepository();
      const result = await instance.createWalletTypeService({
        name,
        description
      });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}