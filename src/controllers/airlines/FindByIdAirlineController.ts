import { Request, Response } from "express";
import { IAirline, AirlineRepository } from "../../repositories/Airlines";

export class FindByIdAirlineController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.params;
    const { id } = data as Partial<IAirline>;

    try {
      const instance = new AirlineRepository();
      const result = await instance.findByIdAirlineService({ id });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}