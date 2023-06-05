import { Request, Response } from "express";
import { ITransaction, TransactionRepository } from "../../repositories/Transactions";

export class FindByIdTransactionController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<ITransaction>;

    try {
      const instance = new TransactionRepository();
      const result = await instance.findByIdTransactionService({ id });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}