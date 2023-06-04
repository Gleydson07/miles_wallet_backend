import { Request, Response } from "express";
import { IWalletType, WalletTypeRepository } from "../../repositories/WalletTypes";

export class UpdateWalletTypeController {
  async handle(request: Request, response: Response) {
    const dataParams: unknown = request.params;
    const dataBody: unknown = request.body;
    
    const { id } = dataParams as Partial<IWalletType>;
    const { name, description } = dataBody as Partial<IWalletType>;

    try {
      const instance = new WalletTypeRepository();
      const result = await instance.updateWalletTypeService({ id, name, description });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}