import { Request, Response } from "express";
import { ITransactionCreate, TransactionRepository } from "../../repositories/Transactions";

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { 
      description,
      amountOrigin,
      amountDestination,
      value,
      walletOriginId,
      walletDestinationId
    } = data as ITransactionCreate;
    
    try {
      const instance = new TransactionRepository();
      const result = await instance.createTransactionService({
        description,
        amountOrigin,
        amountDestination,
        value,
        walletOriginId,
        walletDestinationId
      });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}