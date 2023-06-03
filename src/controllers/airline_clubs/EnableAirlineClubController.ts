import { Request, Response } from "express";
import { IAirlineClub, AirlineClubsRepository } from "../../repositories/AirlineClubs";

export class EnableAirlineClubController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAirlineClub>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    try {
      const instance = new AirlineClubsRepository();
      const result = await instance.enableAirlineClubService({ id });

      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}