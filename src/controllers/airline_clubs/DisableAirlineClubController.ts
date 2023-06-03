import { Request, Response } from "express";
import { IAirlineClub, AirlineClubsRepository } from "../../repositories/AirlineClubs";

export class DisableAirlineClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAirlineClub>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    const instance = new AirlineClubsRepository();
    const result = await instance.disableAirlineClubService({ id });

    return response.json( result );
  }
}