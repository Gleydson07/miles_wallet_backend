import { Request, Response } from "express";
import { TransactionRepository } from "../../repositories/Transactions";

export class FindManyByKeysTransactionController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const {
      userId,
      accountId,
      walletOriginId,
      walletDestinationId
    } = data as any;

    try {
      const instance = new TransactionRepository();
      const result = await instance.findManyByKeysTransactionService({
        userId,
        accountId,
        walletOriginId,
        walletDestinationId
      });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}