import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";

export interface IBankClub {
  id: string;
  name: string;
  website: string;
  phone: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBankClubCreate {
  name: string;
  website: string;
  phone: string;
}

export class BankClubsRepository {
  async createBankClubService({ name, website, phone }: IBankClubCreate) {
    try {
      const bank_club = await prismaClient.bankClub.create({
        data: {
          name,
          website,
          phone
        }
      });

      return bank_club;
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }

  async enableBankClubService({ id }: Partial<IBankClub>) {
    try {
      const bank_club = await prismaClient.bankClub.findUnique({ where: { id } });

      if (!bank_club) {
        throw new Error("Bank club not found");
      }

      await prismaClient.bankClub.update({
        where: { id: bank_club?.id },
        data: { disabled: false }
      });

      return "Bank club enabled";
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }
  
  async disableBankClubService({ id }: Partial<IBankClub>) {
    try {
      const bank_club = await prismaClient.bankClub.findUnique({ where: { id } });

      if (!bank_club) {
        throw new Error("Bank not found");
      }

      await prismaClient.bankClub.update({
        where: { id: bank_club.id },
        data: { disabled: true }
      });

      return "Bank club disabled";
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }

  async findByIdBankClubService({ id }: Partial<IBankClub>) {
    try {
      const bank_club = await prismaClient.bankClub.findUnique({ where: { id } });

      if (!bank_club) {
        throw new Error("Bank club not found");
      }

      return bank_club;
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }

  async findAllBankClubService() {
    try {
      const bank_clubs = await prismaClient.bankClub.findMany();

      return bank_clubs;
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }
}