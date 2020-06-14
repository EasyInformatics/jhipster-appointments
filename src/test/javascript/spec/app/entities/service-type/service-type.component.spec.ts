import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppointmentsTestModule } from '../../../test.module';
import { ServiceTypeComponent } from 'app/entities/service-type/service-type.component';
import { ServiceTypeService } from 'app/entities/service-type/service-type.service';
import { ServiceType } from 'app/shared/model/service-type.model';

describe('Component Tests', () => {
  describe('ServiceType Management Component', () => {
    let comp: ServiceTypeComponent;
    let fixture: ComponentFixture<ServiceTypeComponent>;
    let service: ServiceTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppointmentsTestModule],
        declarations: [ServiceTypeComponent],
      })
        .overrideTemplate(ServiceTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceTypes && comp.serviceTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
