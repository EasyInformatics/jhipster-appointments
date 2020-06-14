import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AppointmentsTestModule } from '../../../test.module';
import { ServiceTypeUpdateComponent } from 'app/entities/service-type/service-type-update.component';
import { ServiceTypeService } from 'app/entities/service-type/service-type.service';
import { ServiceType } from 'app/shared/model/service-type.model';

describe('Component Tests', () => {
  describe('ServiceType Management Update Component', () => {
    let comp: ServiceTypeUpdateComponent;
    let fixture: ComponentFixture<ServiceTypeUpdateComponent>;
    let service: ServiceTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppointmentsTestModule],
        declarations: [ServiceTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ServiceTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceType(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceType();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
