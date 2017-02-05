import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Cidade } from './cidade.model';
import { CidadePopupService } from './cidade-popup.service';
import { CidadeService } from './cidade.service';

@Component({
    selector: 'jhi-cidade-delete-dialog',
    templateUrl: './cidade-delete-dialog.component.html'
})
export class CidadeDeleteDialogComponent {

    cidade: Cidade;

    constructor(
        private cidadeService: CidadeService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager,
        private router: Router
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
    }

    confirmDelete (id: number) {
        this.cidadeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cidadeListModification',
                content: 'Deleted an cidade'
            });
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cidade-delete-popup',
    template: ''
})
export class CidadeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private cidadePopupService: CidadePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.cidadePopupService
                .open(CidadeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
