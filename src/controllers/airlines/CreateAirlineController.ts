import { Request, Response } from "express";
import { IAirlineCreate, AirlineRepository } from "../../repositories/Airlines";

export class CreateAirlineController {
  async handle(request: Request, response: Response) {
    const data: unknown = request.body;
    const { name, website } = data as IAirlineCreate;

    try {
      const instance = new AirlineRepository();
      const result = await instance.createAirlineService({
        name,
        website
      });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}