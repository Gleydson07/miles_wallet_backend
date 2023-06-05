import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";
import { WalletRepository } from "./Wallets";

export interface ITransaction {
  id: string;
  description: string;
  amountOrigin: number;
  amountDestination: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  walletOriginId: string;
  walletDestinationId: string;
}

export interface ITransactionCreate {
  description: string;
  amountOrigin: number;
  amountDestination: number;
  value: number;
  walletOriginId: string;
  walletDestinationId: string;
}

export class TransactionRepository {
  async createTransactionService({
    description,
    amountOrigin,
    amountDestination,
    value,
    walletOriginId,
    walletDestinationId
  }: ITransactionCreate) {
    try {
      const walletRepository = new WalletRepository();
      const walletOrigin = await walletRepository.findByIdWalletService({ id: walletOriginId });

      const [walletDestination, walletCash] = await Promise.all([
        walletRepository.findByIdWalletService({ id: walletDestinationId }),
        walletRepository.findOneByKeysWalletService({ accountId: walletOrigin?.accountId })
      ]);

      if (!walletOrigin) {
        throw new Error("Wallet origin not found");
      }

      if (!walletDestination) {
        throw new Error("Wallet destination not found");
      }

      if (Number(walletOrigin.balance) < amountOrigin) {
        throw new Error("Insufficient funds");
      }

      if (walletOrigin.accountId !== walletDestination.accountId) {
        throw new Error("Wallets must be from the same account");
      }

      if (value && !walletCash) {
        throw new Error("Wallet cash not found");
      }

      if (
        !(['CASH', 'POINTS'].includes(walletOrigin.walletType.name) && ['POINTS', 'MILES'].includes(walletDestination.walletType.name)) ||
        !(['MILES'].includes(walletOrigin.walletType.name) && ['CASH'].includes(walletDestination.walletType.name))
      ) {
        throw new Error("Transaction not allowed");
      }

      await Promise.all([
        walletRepository.updateBalanceWalletService({id: walletOrigin.id, balance: Number(walletOrigin.balance) - amountOrigin}),
        walletRepository.updateBalanceWalletService({id: walletDestination.id, balance: Number(walletDestination.balance) + amountDestination}),
        walletRepository.updateBalanceWalletService({id: walletCash?.id, balance: Number(walletDestination.balance) + value})
      ]);

      const transaction = await prismaClient.transaction.create({
        data: {
          description,
          amountOrigin,
          amountDestination,
          value,
          walletOriginId,
          walletDestinationId
        },
        include: {
          walletOrigin: {
            select: {
              id: true,
              name: true,
              description: true,
              balance: true,
              account: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
              bankClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              airlineClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              walletType: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
            }
          },
          walletDestination: {
            select: {
              id: true,
              name: true,
              description: true,
              balance: true,
              account: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
              bankClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              airlineClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              walletType: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
            }
          },
        }
      });

      return transaction;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async deleteTransactionService({ id }: Partial<ITransaction>) {
    try {
      const transaction = await prismaClient.transaction.findUnique({ where: { id } });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      await prismaClient.transaction.delete({
        where: { id: transaction?.id },
      });

      return "Transaction deleted";
    } catch ( error: any) {
      ErrorHandler(error);
    }
  }

  async findByIdTransactionService({ id }: Partial<ITransaction>) {
    try {
      const transaction = await prismaClient.transaction.findUnique({
        where: { id },
        include: {
          walletOrigin: {
            select: {
              id: true,
              name: true,
              description: true,
              balance: true,
              account: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
              bankClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              airlineClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              walletType: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
            }
          },
          walletDestination: {
            select: {
              id: true,
              name: true,
              description: true,
              balance: true,
              account: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
              bankClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              airlineClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              walletType: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
            }
          },
        }
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      return transaction;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findManyByKeysTransactionService({ userId, accountId, walletOriginId, walletDestinationId }: any) {
    try {
      const wallets = await prismaClient.transaction.findMany({
        where: {
          walletOriginId,
          walletDestinationId,
          walletOrigin: {
            accountId,
            account: {
              userId
            }
          },
          walletDestination: {
            accountId,
            account: {
              userId
            }
          }
        },
        include: {
          walletOrigin: {
            select: {
              id: true,
              name: true,
              description: true,
              balance: true,
              account: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
              bankClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              airlineClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              walletType: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
            }
          },
          walletDestination: {
            select: {
              id: true,
              name: true,
              description: true,
              balance: true,
              account: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
              bankClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              airlineClub: {
                select: {
                  id: true,
                  name: true
                }
              },
              walletType: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              },
            }
          },
        }
      });

      if (!wallets.length) {
        throw new Error("Transactions not found");
      }

      return wallets;
    } catch (error: any) {
      ErrorHandler(error);
    }
  } 
}