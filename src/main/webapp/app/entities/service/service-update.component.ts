import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IService, Service } from 'app/shared/model/service.model';
import { ServiceService } from './service.service';
import { IServiceType } from 'app/shared/model/service-type.model';
import { ServiceTypeService } from 'app/entities/service-type/service-type.service';

@Component({
  selector: 'jhi-service-update',
  templateUrl: './service-update.component.html',
})
export class ServiceUpdateComponent implements OnInit {
  isSaving = false;
  servicetypes: IServiceType[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    duration: [],
    serviceType: [],
  });

  constructor(
    protected serviceService: ServiceService,
    protected serviceTypeService: ServiceTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ service }) => {
      this.updateForm(service);

      this.serviceTypeService.query().subscribe((res: HttpResponse<IServiceType[]>) => (this.servicetypes = res.body || []));
    });
  }

  updateForm(service: IService): void {
    this.editForm.patchValue({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      serviceType: service.serviceType,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const service = this.createFromForm();
    if (service.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceService.update(service));
    } else {
      this.subscribeToSaveResponse(this.serviceService.create(service));
    }
  }

  private createFromForm(): IService {
    return {
      ...new Service(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      serviceType: this.editForm.get(['serviceType'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IService>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IServiceType): any {
    return item.id;
  }
}
