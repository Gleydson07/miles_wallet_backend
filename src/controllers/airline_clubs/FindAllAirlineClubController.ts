import { Request, Response } from "express";
import { AirlineClubsRepository } from "../../repositories/AirlineClubs";

export class FindAllAirlineClubController {
  async handle(request: Request, response: Response) {
    const instance = new AirlineClubsRepository();
    const result = await instance.findAllAirlineClubService();

    return response.json(result);
  }
}