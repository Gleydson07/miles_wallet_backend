import { Request, Response } from "express";
import { AirlineRepository } from "../../repositories/Airlines";

export class FindAllAirlineController {
  async handle(request: Request, response: Response) {
    
    const instance = new AirlineRepository();
    const result = await instance.findAllAirlineService();

    return response.json(result);
  }
}