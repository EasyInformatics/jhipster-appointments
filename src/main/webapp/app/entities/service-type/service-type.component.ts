import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceType } from 'app/shared/model/service-type.model';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeDeleteDialogComponent } from './service-type-delete-dialog.component';

@Component({
  selector: 'jhi-service-type',
  templateUrl: './service-type.component.html',
})
export class ServiceTypeComponent implements OnInit, OnDestroy {
  serviceTypes?: IServiceType[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceTypeService: ServiceTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceTypeService.query().subscribe((res: HttpResponse<IServiceType[]>) => (this.serviceTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceTypeListModification', () => this.loadAll());
  }

  delete(serviceType: IServiceType): void {
    const modalRef = this.modalService.open(ServiceTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceType = serviceType;
  }
}
