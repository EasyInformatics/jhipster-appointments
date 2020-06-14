import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceType, ServiceType } from 'app/shared/model/service-type.model';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeComponent } from './service-type.component';
import { ServiceTypeDetailComponent } from './service-type-detail.component';
import { ServiceTypeUpdateComponent } from './service-type-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceTypeResolve implements Resolve<IServiceType> {
  constructor(private service: ServiceTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceType: HttpResponse<ServiceType>) => {
          if (serviceType.body) {
            return of(serviceType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceType());
  }
}

export const serviceTypeRoute: Routes = [
  {
    path: '',
    component: ServiceTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appointmentsApp.serviceType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServiceTypeDetailComponent,
    resolve: {
      serviceType: ServiceTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appointmentsApp.serviceType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServiceTypeUpdateComponent,
    resolve: {
      serviceType: ServiceTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appointmentsApp.serviceType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServiceTypeUpdateComponent,
    resolve: {
      serviceType: ServiceTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appointmentsApp.serviceType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
