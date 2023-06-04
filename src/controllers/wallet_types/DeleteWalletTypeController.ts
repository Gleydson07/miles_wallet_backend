import { Request, Response } from "express";
import { IWalletType, WalletTypeRepository } from "../../repositories/WalletTypes";

export class DeleteWalletTypeController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IWalletType>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    try {
      const instance = new WalletTypeRepository();
      const result = await instance.deleteWalletTypeService({ id });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}