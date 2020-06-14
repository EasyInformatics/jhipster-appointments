import { IAppointment } from 'app/shared/model/appointment.model';
import { IServiceType } from 'app/shared/model/service-type.model';

export interface IService {
  id?: number;
  name?: string;
  description?: string;
  duration?: number;
  appointments?: IAppointment[];
  serviceType?: IServiceType;
}

export class Service implements IService {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public duration?: number,
    public appointments?: IAppointment[],
    public serviceType?: IServiceType
  ) {}
}
