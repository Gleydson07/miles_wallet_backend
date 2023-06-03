import { Request, Response } from "express";
import { AirlineRepository } from "../../repositories/Airlines";

export class FindAllAirlineController {
  async handle(request: Request, response: Response) {
    
    try {
      const instance = new AirlineRepository();
      const result = await instance.findAllAirlineService();

      return response.json(result);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }
}