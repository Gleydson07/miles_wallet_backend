import { Request, Response } from "express";
import { ITransactionCreate, TransactionRepository } from "../../repositories/Transactions";

export class CreateDepositCashTransactionController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { 
      description,
      amountDestination,
      walletDestinationId
    } = data as ITransactionCreate;
    
    try {
      const instance = new TransactionRepository();
      const result = await instance.createDepositCashTransactionService({
        description,
        amountDestination,
        walletDestinationId
      });
  
      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}