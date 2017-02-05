import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Cidade } from './cidade.model';
import { CidadeService } from './cidade.service';
@Injectable()
export class CidadePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private cidadeService: CidadeService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.cidadeService.find(id).subscribe(cidade => {
                this.cidadeModalRef(component, cidade);
            });
        } else {
            return this.cidadeModalRef(component, new Cidade());
        }
    }

    cidadeModalRef(component: Component, cidade: Cidade): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cidade = cidade;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
            this.isOpen = false;
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            this.isOpen = false;
        });
        return modalRef;
    }
}
