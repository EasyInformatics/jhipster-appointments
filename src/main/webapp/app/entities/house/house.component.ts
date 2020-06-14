import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHouse } from 'app/shared/model/house.model';
import { HouseService } from './house.service';
import { HouseDeleteDialogComponent } from './house-delete-dialog.component';

@Component({
  selector: 'jhi-house',
  templateUrl: './house.component.html',
})
export class HouseComponent implements OnInit, OnDestroy {
  houses?: IHouse[];
  eventSubscriber?: Subscription;

  constructor(protected houseService: HouseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.houseService.query().subscribe((res: HttpResponse<IHouse[]>) => (this.houses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHouses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHouse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHouses(): void {
    this.eventSubscriber = this.eventManager.subscribe('houseListModification', () => this.loadAll());
  }

  delete(house: IHouse): void {
    const modalRef = this.modalService.open(HouseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.house = house;
  }
}
