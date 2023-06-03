import { Request, Response } from "express";
import { IAirlineClub, AirlineClubsRepository } from "../../repositories/AirlineClubs";

export class FindByIdAirlineClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAirlineClub>;

    const instance = new AirlineClubsRepository();
    const result = await instance.findByIdAirlineClubService({ id });

    return response.json(result);
  }
}