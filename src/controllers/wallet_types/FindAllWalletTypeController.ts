import { Request, Response } from "express";
import { IWalletType, WalletTypeRepository } from "../../repositories/WalletTypes";

export class FindAllWalletTypeController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;

    try {
      const instance = new WalletTypeRepository();
      const result = await instance.findAllWalletTypeService();

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}