import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";

export interface IWallet {
  id: string;
  name: string;
  description: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  bankClubId: string;
  airlineClubId: string;
}

export interface IWalletCreate {
  name: string;
  description: string;
  balance: number;
  accountId: string;
  bankClubId: string;
  airlineClubId: string;
}

export class WalletRepository {
  async createWalletService({
    name,
    description,
    balance,
    accountId,
    bankClubId,
    airlineClubId
  }: IWalletCreate) {
    try {
      if (bankClubId && airlineClubId) {
        return { error: "You can't create a wallet with bank and airline club" };
      }

      if (!bankClubId && !airlineClubId) {
        return { error: "You must create a wallet with bank or airline club" };
      }

      const wallet = await prismaClient.wallet.create({
        data: {
          name,
          description,
          balance,
          accountId,
          bankClubId,
          airlineClubId
        },
        include: {
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
        }
      });

      return { wallet };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async deleteWalletService({ id }: Partial<IWallet>) {
    try {
      const wallet = await prismaClient.wallet.findUnique({ where: { id } });

      if (!wallet) {
        return { error: "Wallet not found" };
      }

      await prismaClient.wallet.delete({
        where: { id: wallet?.id },
      });

      return { message: "Wallet deleted" };
    } catch ( error: any) {
      ErrorHandler(error);
    }
  }

  async findByIdWalletService({ id }: Partial<IWallet>) {
    try {
      const wallet = await prismaClient.wallet.findUnique({
        where: { id },
        include: {
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
        }
      });

      if (!wallet) {
        return { error: "Wallet not found" };
      }

      return { wallet };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findManyByAccountIdWalletService({ accountId }: Partial<IWallet>) {
    try {
      const wallets = await prismaClient.wallet.findMany({
        where: { accountId },
        include: {
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
        }
      });

      if (!wallets.length) {
        return { error: "Wallets not found" };
      }

      return { wallets };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async updateWalletService({ id, name, description }: Partial<IWallet>) {
    try {
      const wallet = await this.findByIdWalletService({ id });

      if (!wallet) {
        return { error: "Wallet not found" };
      }

      const walletUpdated = await prismaClient.wallet.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      return { wallet:  walletUpdated };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async updateBalanceWalletService({ id, balance }: Partial<IWallet>) {
    try {
      const wallet = await this.findByIdWalletService({ id });

      if (!wallet) {
        return { error: "Wallet not found" };
      }

      const walletUpdated = await prismaClient.wallet.update({
        where: { id },
        data: {
          balance
        }
      });

      return { wallet:  walletUpdated };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }
}