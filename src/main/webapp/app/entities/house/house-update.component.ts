import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHouse, House } from 'app/shared/model/house.model';
import { HouseService } from './house.service';

@Component({
  selector: 'jhi-house-update',
  templateUrl: './house-update.component.html',
})
export class HouseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    number: [],
  });

  constructor(protected houseService: HouseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ house }) => {
      this.updateForm(house);
    });
  }

  updateForm(house: IHouse): void {
    this.editForm.patchValue({
      id: house.id,
      number: house.number,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const house = this.createFromForm();
    if (house.id !== undefined) {
      this.subscribeToSaveResponse(this.houseService.update(house));
    } else {
      this.subscribeToSaveResponse(this.houseService.create(house));
    }
  }

  private createFromForm(): IHouse {
    return {
      ...new House(),
      id: this.editForm.get(['id'])!.value,
      number: this.editForm.get(['number'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHouse>>): void {
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
