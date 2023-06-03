import { Request, Response } from "express";
import { IAirlineClub, AirlineClubsRepository } from "../../repositories/AirlineClubs";

export class FindByIdAirlineClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAirlineClub>;

    try {
      const instance = new AirlineClubsRepository();
      const result = await instance.findByIdAirlineClubService({ id });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}