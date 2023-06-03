import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";

export interface IAirlineClub {
  id: string;
  name: string;
  website: string;
  phone: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAirlineClubCreate {
  name: string;
  website: string;
  phone: string;
  airlineId: string;
}

export class AirlineClubsRepository {
  async createAirlineClubService({ name, website, phone, airlineId }: IAirlineClubCreate) {
    try {
      const airline_club = await prismaClient.airlineClub.create({
        data: {
          name,
          website,
          phone,
          airlineId: airlineId
        },
        select: {
          id: true,
          name: true,
          website: true,
          phone: true,
          disabled: true,
          createdAt: true,
          updatedAt: true,
          airline: true,
        },
      });

      return { airline_club };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async enableAirlineClubService({ id }: Partial<IAirlineClub>) {
    try {
      const airline_club = await prismaClient.airlineClub.findUnique({ where: { id } });

      if (!airline_club) {
        return { error: "Airline club not found" };
      }

      await prismaClient.airlineClub.update({
        where: { id: airline_club?.id },
        data: { disabled: false }
      });

      return { message: "Airline club enabled" };
    } catch ( error: any) {
      ErrorHandler(error);
    }
  }
  
  async disableAirlineClubService({ id }: Partial<IAirlineClub>) {
    try {
      const airline_club = await prismaClient.airlineClub.findUnique({ where: { id } });

      if (!airline_club) {
        return { error: "Airline not found" };
      }

      await prismaClient.airlineClub.update({
        where: { id: airline_club.id },
        data: { disabled: true }
      });

      return { message: "Airline club disabled" };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findByIdAirlineClubService({ id }: Partial<IAirlineClub>) {
    try {
      const airline_club = await prismaClient.airlineClub.findUnique({
        where: { id },
        include: {
          airline: true
        }
      });

      if (!airline_club) {
        return { error: "Airline club not found" };
      }

      return { airline_club };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }

  async findAllAirlineClubService() {
    try {
      const airline_clubs = await prismaClient.airlineClub.findMany({
        include: {
          airline: true
        }
      });

      return { airline_clubs };
    } catch (error: any) {
      ErrorHandler(error);
    }
  }
}