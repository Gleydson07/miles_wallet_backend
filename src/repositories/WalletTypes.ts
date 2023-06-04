import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";

export interface IWalletType {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWalletTypeCreate {
  name: string;
  description: string;
}

export class WalletTypeRepository {
  async createWalletTypeService({
    name,
    description,
  }: IWalletTypeCreate) {
    try {
      const walletType = await prismaClient.walletType.create({
        data: {
          name,
          description
        }
      });

      return { walletType };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async deleteWalletTypeService({ id }: Partial<IWalletType>) {
    try {
      const walletType = await prismaClient.walletType.findUnique({ where: { id } });

      if (!walletType) {
        return { error: "WalletType not found" };
      }

      await prismaClient.walletType.delete({
        where: { id: walletType?.id },
      });

      return { message: "WalletType deleted" };
    } catch ( error: any) {
      ErrorHandler(error);
    }
  }

  async findByIdWalletTypeService({ id }: Partial<IWalletType>) {
    try {
      const walletType = await prismaClient.walletType.findUnique({
        where: { id }
      });

      if (!walletType) {
        return { error: "WalletType not found" };
      }

      return { walletType };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findAllWalletTypeService() {
    try {
      const walletTypes = await prismaClient.walletType.findMany();

      return { walletTypes };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async updateWalletTypeService({ id, name, description }: Partial<IWalletType>) {
    try {
      const walletType = await this.findByIdWalletTypeService({ id });

      if (!walletType) {
        return { error: "WalletType not found" };
      }

      const walletTypeUpdated = await prismaClient.walletType.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      return { walletType:  walletTypeUpdated };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }
}