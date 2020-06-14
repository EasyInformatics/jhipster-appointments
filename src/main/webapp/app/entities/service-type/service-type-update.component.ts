import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IServiceType, ServiceType } from 'app/shared/model/service-type.model';
import { ServiceTypeService } from './service-type.service';

@Component({
  selector: 'jhi-service-type-update',
  templateUrl: './service-type-update.component.html',
})
export class ServiceTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected serviceTypeService: ServiceTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceType }) => {
      this.updateForm(serviceType);
    });
  }

  updateForm(serviceType: IServiceType): void {
    this.editForm.patchValue({
      id: serviceType.id,
      name: serviceType.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceType = this.createFromForm();
    if (serviceType.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceTypeService.update(serviceType));
    } else {
      this.subscribeToSaveResponse(this.serviceTypeService.create(serviceType));
    }
  }

  private createFromForm(): IServiceType {
    return {
      ...new ServiceType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceType>>): void {
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
}
