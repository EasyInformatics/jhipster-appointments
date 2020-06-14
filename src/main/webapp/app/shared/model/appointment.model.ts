import { Moment } from 'moment';
import { IHouse } from 'app/shared/model/house.model';
import { IService } from 'app/shared/model/service.model';

export interface IAppointment {
  id?: number;
  startDateTime?: Moment;
  house?: IHouse;
  service?: IService;
}

export class Appointment implements IAppointment {
  constructor(public id?: number, public startDateTime?: Moment, public house?: IHouse, public service?: IService) {}
}
