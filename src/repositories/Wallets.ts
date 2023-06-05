import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";
import { WalletTypeRepository } from "./WalletTypes";

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
  walletTypeId: string;
}

export interface IWalletCreate {
  name: string;
  description: string;
  accountId: string;
  bankClubId: string;
  airlineClubId: string;
}

export class WalletRepository {
  async createWalletService({
    name,
    description,
    accountId,
    bankClubId,
    airlineClubId
  }: IWalletCreate) {
    try {
      if (bankClubId && airlineClubId) {
        throw new Error("You can't create a wallet with bank and airline club");
      }

      if (!bankClubId && !airlineClubId) {
        throw new Error("You must create a bank or airline club");
      }

      const alreadyExists = await this.findOneByKeysWalletService({
        accountId,
        bankClubId,
        airlineClubId
      });

      if (alreadyExists) {
        throw new Error("Wallet already exists");
      }

      const walletTypeRepository = new WalletTypeRepository();
      const walletTypeList = await walletTypeRepository.findAllWalletTypeService();

      if (!walletTypeList?.length) {
        throw new Error("You must create a wallet type");
      }
      
      let walletTypeIdSelected = walletTypeList[0].id;
      if (bankClubId) walletTypeIdSelected = walletTypeList[1].id;
      if (airlineClubId) walletTypeIdSelected = walletTypeList[2].id;

      const wallet = await prismaClient.wallet.create({
        data: {
          name,
          description,
          accountId,
          bankClubId,
          airlineClubId,
          walletTypeId: walletTypeIdSelected
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
          walletType: {
            select: {
              id: true,
              name: true,
              description: true
            }
          },
        }
      });

      return wallet;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async deleteWalletService({ id }: Partial<IWallet>) {
    try {
      const wallet = await prismaClient.wallet.findUnique({ where: { id } });

      if (!wallet) {
        throw new Error("Wallet not found");
      }

      await prismaClient.wallet.delete({
        where: { id: wallet?.id },
      });

      return "Wallet deleted";
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
          walletType: {
            select: {
              id: true,
              name: true,
              description: true
            }
          },
        }
      });

      if (!wallet) {
        throw new Error("Wallet not found");
      }

      return wallet;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findOneByKeysWalletService({ accountId, bankClubId, airlineClubId }: Partial<IWallet>) {
    try {
      const wallet = await prismaClient.wallet.findFirst({
        where: {
          accountId,
          AND: [
            { bankClubId: bankClubId || null },
            { airlineClubId: airlineClubId || null }
          ],
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
          walletType: {
            select: {
              id: true,
              name: true,
              description: true
            }
          },
        }
      });

      return wallet;
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
          walletType: {
            select: {
              id: true,
              name: true,
              description: true
            }
          },
        }
      });

      if (!wallets.length) {
        throw new Error("Wallets not found");
      }

      return wallets;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async updateWalletService({ id, name, description }: Partial<IWallet>) {
    try {
      const wallet = await this.findByIdWalletService({ id });

      if (!wallet) {
        throw new Error("Wallet not found");
      }

      const walletUpdated = await prismaClient.wallet.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      return walletUpdated;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async updateBalanceWalletService({ id, balance }: Partial<IWallet>) {
    try {
      const wallet = await this.findByIdWalletService({ id });

      if (!wallet) {
        throw new Error("Wallet not found");
      }

      const walletUpdated = await prismaClient.wallet.update({
        where: { id },
        data: {
          balance
        },
        select: {
          id: true,
          balance: true
        }
      });

      return walletUpdated;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }
}