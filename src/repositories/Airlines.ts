import { prismaClient } from "../database/prismaClient";
import { ErrorHandler } from "../utils/ErrorHandler";

export interface IAirline {
  id: string;
  name: string;
  website: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAirlineCreate {
  name: string;
  website: string;
}

export class AirlineRepository {
  async createAirlineService({ name, website }: IAirlineCreate) {
    try {
      const airline = await prismaClient.airline.create({
        data: {
          name,
          website
        }
      });

      return airline;
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }

  async enableAirlineService({ id }: Partial<IAirline>) {
    try {
      const airline = await prismaClient.airline.findUnique({ where: { id } });

      if (!airline) {
        throw new Error("Airline not found");
      }

      await prismaClient.airline.update({
        where: { id: airline?.id },
        data: { disabled: false }
      });

      return "Airline enabled";
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }
  
  async disableAirlineService({ id }: Partial<IAirline>) {
    try {
      const airline = await prismaClient.airline.findUnique({ where: { id } });

      if (!airline) {
        throw new Error("Airline not found");
      }

      await prismaClient.airline.update({
        where: { id: airline.id },
        data: { disabled: true }
      });

      return "Airline disabled";
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }

  async findByIdAirlineService({ id }: Partial<IAirline>) {
    try {
      const airline = await prismaClient.airline.findUnique({ where: { id } });

      if (!airline) {
        throw new Error("Airline not found");
      }

      return airline;
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }

  async findAllAirlineService() {
    try {
      const airlines = await prismaClient.airline.findMany();

      return airlines;
    } catch ( error: any ) {
      ErrorHandler(error);
    }
  }
}