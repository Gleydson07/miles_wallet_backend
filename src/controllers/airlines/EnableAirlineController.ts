import { Request, Response } from "express";
import { IAirline, AirlineRepository } from "../../repositories/Airlines";

export class EnableAirlineController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAirline>;

    if (!id) {
      return response.status(400).json({ message: "Missing id" });
    }

    try {
      const instance = new AirlineRepository();
      const result = await instance.enableAirlineService({ id });

      return response.json( result );
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}