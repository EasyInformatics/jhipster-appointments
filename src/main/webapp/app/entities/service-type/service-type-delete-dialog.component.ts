import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceType } from 'app/shared/model/service-type.model';
import { ServiceTypeService } from './service-type.service';

@Component({
  templateUrl: './service-type-delete-dialog.component.html',
})
export class ServiceTypeDeleteDialogComponent {
  serviceType?: IServiceType;

  constructor(
    protected serviceTypeService: ServiceTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceTypeListModification');
      this.activeModal.close();
    });
  }
}
