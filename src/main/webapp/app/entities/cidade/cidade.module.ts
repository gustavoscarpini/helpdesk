import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelpdeskSharedModule } from '../../shared';

import {
    CidadeService,
    CidadePopupService,
    CidadeComponent,
    CidadeDetailComponent,
    CidadeEditComponent,
    CidadeDeletePopupComponent,
    CidadeDeleteDialogComponent,
    cidadeRoute,
    cidadePopupRoute,
    CidadeResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...cidadeRoute,
    ...cidadePopupRoute,
];

@NgModule({
    imports: [
        HelpdeskSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CidadeComponent,
        CidadeDetailComponent,
        CidadeEditComponent,
        CidadeDeleteDialogComponent,
        CidadeDeletePopupComponent,
    ],
    entryComponents: [
        CidadeComponent,
        CidadeEditComponent,
        CidadeDeleteDialogComponent,
        CidadeDeletePopupComponent,
    ],
    providers: [
        CidadeService,
        CidadePopupService,
        CidadeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpdeskCidadeModule {}
