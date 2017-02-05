import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PaginationUtil} from 'ng-jhipster';

import {CidadeComponent} from './cidade.component';
import {CidadeDetailComponent} from './cidade-detail.component';
import {CidadeEditComponent} from './cidade-edit.component';
import {CidadeDeletePopupComponent} from './cidade-delete-dialog.component';

import {Principal} from '../../shared';

@Injectable()
export class CidadeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const cidadeRoute: Routes = [
    {
        path: 'cidade',
        component: CidadeComponent,
        resolve: {
            'pagingParams': CidadeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cidades'
        }
    }, {
        path: 'cidade/:id',
        component: CidadeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cidades'
        }
    },
    {
        path: 'cidade-new',
        component: CidadeEditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cidades'
        }
    },
    {
        path: 'cidade-edit/:id',
        component: CidadeEditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cidades'
        }
    },
];

export const cidadePopupRoute: Routes = [

    {
        path: 'cidade/:id/delete',
        component: CidadeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cidades'
        },
        outlet: 'popup'
    }
];
