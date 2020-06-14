import { IUser } from 'app/core/user/user.model';
import { IAppointment } from 'app/shared/model/appointment.model';

export interface IHouse {
  id?: number;
  number?: string;
  users?: IUser[];
  appointments?: IAppointment[];
}

export class House implements IHouse {
  constructor(public id?: number, public number?: string, public users?: IUser[], public appointments?: IAppointment[]) {}
}
