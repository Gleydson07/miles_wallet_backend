import { Request, Response } from "express";
import { AirlineClubsRepository } from "../../repositories/AirlineClubs";

export class FindAllAirlineClubController {
  async handle(request: Request, response: Response) {
    try {
      const instance = new AirlineClubsRepository();
      const result = await instance.findAllAirlineClubService();

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}