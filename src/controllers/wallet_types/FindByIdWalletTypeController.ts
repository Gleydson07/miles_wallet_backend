import { Request, Response } from "express";
import { IWalletType, WalletTypeRepository } from "../../repositories/WalletTypes";

export class FindByIdWalletTypeController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IWalletType>;

    try {
      const instance = new WalletTypeRepository();
      const result = await instance.findByIdWalletTypeService({ id });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}