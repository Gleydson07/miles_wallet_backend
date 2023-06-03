import { prismaClient } from "../database/prismaClient";

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

      return { airline };
    } catch (error) {
      return error;
    }
  }

  async enableAirlineService({ id }: Partial<IAirline>) {
    try {
      const airline = await prismaClient.airline.findUnique({ where: { id } });

      if (!airline) {
        return { error: "Airline not found" };
      }

      await prismaClient.airline.update({
        where: { id: airline?.id },
        data: { disabled: false }
      });

      return { message: "Airline enabled" };
    } catch ( error: any) {
      return { error: error.message };
    }
  }
  
  async disableAirlineService({ id }: Partial<IAirline>) {
    try {
      const airline = await prismaClient.airline.findUnique({ where: { id } });

      if (!airline) {
        return { error: "Airline not found" };
      }

      await prismaClient.airline.update({
        where: { id: airline.id },
        data: { disabled: true }
      });

      return { message: "Airline disabled" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async findByIdAirlineService({ id }: Partial<IAirline>) {
    try {
      const airline = await prismaClient.airline.findUnique({ where: { id } });

      if (!airline) {
        return { error: "Airline not found" };
      }

      return { airline };
    } catch (error) {
      return error;
    }
  }

  async findAllAirlineService() {
    try {
      const airlines = await prismaClient.airline.findMany();

      return { airlines };
    } catch (error) {
      return error;
    }
  }
}