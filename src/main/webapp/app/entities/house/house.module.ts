import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppointmentsSharedModule } from 'app/shared/shared.module';
import { HouseComponent } from './house.component';
import { HouseDetailComponent } from './house-detail.component';
import { HouseUpdateComponent } from './house-update.component';
import { HouseDeleteDialogComponent } from './house-delete-dialog.component';
import { houseRoute } from './house.route';

@NgModule({
  imports: [AppointmentsSharedModule, RouterModule.forChild(houseRoute)],
  declarations: [HouseComponent, HouseDetailComponent, HouseUpdateComponent, HouseDeleteDialogComponent],
  entryComponents: [HouseDeleteDialogComponent],
})
export class AppointmentsHouseModule {}
