import { IService } from 'app/shared/model/service.model';

export interface IServiceType {
  id?: number;
  name?: string;
  services?: IService[];
}

export class ServiceType implements IServiceType {
  constructor(public id?: number, public name?: string, public services?: IService[]) {}
}
