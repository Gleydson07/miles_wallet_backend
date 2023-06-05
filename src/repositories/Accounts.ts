import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";

export interface IAccount {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountCreate {
  name: string;
  description: string;
  userId: string;
}

export class AccountRepository {
  async createAccountService({ name, description, userId }: IAccountCreate) {
    try {
      const account = await prismaClient.account.create({
        data: {
          name,
          description,
          userId,
          wallet: {
            create: {
              name: "Carteira",
              description: "Recursos financeiros",
              walletType: {
                connect: {
                  name: "CASH",
                },
              },
            },
          },
        },
        include: {
          wallet: {
            include: {
              walletType: true,
            },
          },
        },
      });

      return account;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async deleteAccountService({ id }: Partial<IAccount>) {
    try {
      const account = await prismaClient.account.findUnique({ where: { id } });

      if (!account) {
        throw new Error("Account not found");
      }

      await prismaClient.account.delete({
        where: { id: account?.id },
      });

      return "Account deleted";
    } catch ( error: any) {
      ErrorHandler(error);
    }
  }

  async findByIdAccountService({ id }: Partial<IAccount>) {
    try {
      const account = await prismaClient.account.findUnique({ where: { id } });

      if (!account) {
        throw new Error("Account not found");
      }

      return account;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findManyByUserIdAccountService({ userId }: Partial<IAccount>) {
    try {
      const accounts = await prismaClient.account.findMany({ where: { userId } });

      if (!accounts.length) {
        throw new Error("Accounts not found");
      }

      return accounts;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async updateAccountService({ id, name, description }: Partial<IAccount>) {
    try {
      const account = await this.findByIdAccountService({ id });

      if (!account) {
        throw new Error("Account not found");
      }

      const accountUpdated = await prismaClient.account.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      return accountUpdated;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }
}