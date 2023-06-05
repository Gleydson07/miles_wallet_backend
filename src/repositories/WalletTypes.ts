import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";

// id: "1", name: "CASH",
// id: "2", name: "POINTS",
// id: "3", name: "MILES"

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

      return walletType;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async deleteWalletTypeService({ id }: Partial<IWalletType>) {
    try {
      const walletType = await prismaClient.walletType.findUnique({ where: { id } });

      if (!walletType) {
        throw new Error("WalletType not found");
      }

      await prismaClient.walletType.delete({
        where: { id: walletType?.id },
      });

      return "WalletType deleted";
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
        throw new Error("WalletType not found");
      }

      return walletType;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findByNameWalletTypeService({ name }: Partial<IWalletType>) {
    try {
      const walletType = await prismaClient.walletType.findUnique({
        where: { name }
      });

      if (!walletType) {
        throw new Error("WalletType not found");
      }

      return walletType;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findAllWalletTypeService() {
    try {
      const walletTypes = await prismaClient.walletType.findMany();

      return walletTypes;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async updateWalletTypeService({ id, name, description }: Partial<IWalletType>) {
    try {
      const walletType = await this.findByIdWalletTypeService({ id });

      if (!walletType) {
        throw new Error("WalletType not found");
      }

      const walletTypeUpdated = await prismaClient.walletType.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      return walletTypeUpdated;
    } catch (error: any) {
      ErrorHandler(error);
    }
  }
}