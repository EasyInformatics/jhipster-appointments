import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'house',
        loadChildren: () => import('./house/house.module').then(m => m.AppointmentsHouseModule),
      },
      {
        path: 'service-type',
        loadChildren: () => import('./service-type/service-type.module').then(m => m.AppointmentsServiceTypeModule),
      },
      {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(m => m.AppointmentsServiceModule),
      },
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentsAppointmentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class AppointmentsEntityModule {}
