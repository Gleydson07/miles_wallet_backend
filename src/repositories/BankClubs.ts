import { prismaClient } from "../database/prismaClient";

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

      return { bank_club };
    } catch (error) {
      return error;
    }
  }

  async enableBankClubService({ id }: Partial<IBankClub>) {
    try {
      const bank_club = await prismaClient.bankClub.findUnique({ where: { id } });

      if (!bank_club) {
        return { error: "Bank club not found" };
      }

      await prismaClient.bankClub.update({
        where: { id: bank_club?.id },
        data: { disabled: false }
      });

      return { message: "Bank club enabled" };
    } catch ( error: any) {
      return { error: error.message };
    }
  }
  
  async disableBankClubService({ id }: Partial<IBankClub>) {
    try {
      const bank_club = await prismaClient.bankClub.findUnique({ where: { id } });

      if (!bank_club) {
        return { error: "Bank not found" };
      }

      await prismaClient.bankClub.update({
        where: { id: bank_club.id },
        data: { disabled: true }
      });

      return { message: "Bank club disabled" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async findByIdBankClubService({ id }: Partial<IBankClub>) {
    try {
      const bank_club = await prismaClient.bankClub.findUnique({ where: { id } });

      if (!bank_club) {
        return { error: "Bank club not found" };
      }

      return { bank_club };
    } catch (error) {
      return error;
    }
  }

  async findAllBankClubService() {
    try {
      const bank_clubs = await prismaClient.bankClub.findMany();

      return { bank_clubs };
    } catch (error) {
      return error;
    }
  }
}