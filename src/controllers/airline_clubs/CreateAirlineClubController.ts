import { Request, Response } from "express";
import { IAirlineClubCreate, AirlineClubsRepository } from "../../repositories/AirlineClubs";

export class CreateAirlineClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { name, website, phone, airlineId } = data as IAirlineClubCreate;

    try {
      const instance = new AirlineClubsRepository();
      const result = await instance.createAirlineClubService({
        name,
        website,
        phone,
        airlineId
      });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}