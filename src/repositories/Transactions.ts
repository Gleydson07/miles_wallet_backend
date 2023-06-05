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
        !(['CASH', 'POINTS'].includes(walletOrigin.walletType.name) && ['POINTS', 'MILES'].includes(walletDestination.walletType.name)) &&
        !(['MILES'].includes(walletOrigin.walletType.name) && ['CASH'].includes(walletDestination.walletType.name))
      ) {
        throw new Error("Transaction not allowed");
      }

      if (Number(value) && Number(value) !== 0 && walletCash?.id && ![walletOrigin.id, walletDestination.id].includes(walletCash?.id)) {
        await walletRepository.updateBalanceWalletService({id: walletCash?.id, balance: Number(walletDestination.balance) + Number(value)})
      }

      await Promise.all([
        walletRepository.updateBalanceWalletService({id: walletOrigin.id, balance: Number(walletOrigin.balance) - Number(amountOrigin)}),
        walletRepository.updateBalanceWalletService({id: walletDestination.id, balance: Number(walletDestination.balance) + Number(amountDestination)})
      ]);

      const transaction = await prismaClient.transaction.create({
        data: {
          description,
          amountOrigin,
          amountDestination,
          value: value || 0,
          walletOriginId,
          walletDestinationId,
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

  async createDepositCashTransactionService({
    description,
    amountDestination,
    walletDestinationId
  }: Partial<ITransactionCreate>) {
    try {
      const walletRepository = new WalletRepository();
      const wallet = await walletRepository.findByIdWalletService({ id: walletDestinationId });

      if (!amountDestination) {
        throw new Error("Amount is required");
      }

      if (!wallet || wallet.walletType.name !== 'CASH') {
        throw new Error("Wallet cash not found");
      }

      await walletRepository.updateBalanceWalletService({id: wallet.id, balance: Number(wallet.balance) + amountDestination});
      const transaction = await prismaClient.transaction.create({
        data: {
          description,
          amountOrigin: 0,
          amountDestination: amountDestination!,
          walletOriginId: wallet.id,
          walletDestinationId: wallet.id
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

      const walletRepository = new WalletRepository();
      const [walletOrigin, walletDestination] = await Promise.all([
        walletRepository.findByIdWalletService({id: transaction.walletOriginId}),
        walletRepository.findByIdWalletService({id: transaction.walletDestinationId})
      ]);

      if (transaction.walletOriginId !== transaction.walletDestinationId) {
        await walletRepository.updateBalanceWalletService({
          id: transaction.walletOriginId,
          balance: Number(walletOrigin?.balance) + Number(transaction.amountOrigin)
        });
      }

      await walletRepository.updateBalanceWalletService({
        id: transaction.walletDestinationId,
        balance: Number(walletDestination?.balance) - Number(transaction.amountDestination)
      });

      if (Number(transaction.value) && Number(transaction.value) !== 0) {
        const cashWallet = await walletRepository.findOneByKeysWalletService({ accountId: walletOrigin?.accountId });
        await walletRepository.updateBalanceWalletService({
          id: cashWallet?.id,
          balance: Number(cashWallet?.balance) + Number(transaction.value)
        });
      }
        
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
          AND: [
            { walletOriginId: { equals: walletOriginId} },
            { walletDestinationId: { equals: walletDestinationId } },
            { walletOrigin: {
              accountId : { equals: accountId },
              account: {
                userId: { equals: userId }
              }
            }},
            { walletDestination: {
              accountId : { equals: accountId },
              account: {
                userId: { equals: userId }
              }
            }}
          ]            
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