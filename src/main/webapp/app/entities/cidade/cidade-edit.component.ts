import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';

import {EventManager, AlertService} from 'ng-jhipster';

import {ActivatedRoute} from '@angular/router';
import {Cidade} from './cidade.model';
import {CidadeService} from './cidade.service';
@Component({
    selector: 'jhi-cidade-edit',
    templateUrl: './cidade-edit.component.html'
})
export class CidadeEditComponent implements OnInit, OnDestroy{

    cidade: Cidade;
    private subscription: any;
    authorities: any[];
    isSaving: boolean;

    constructor(private alertService: AlertService,
                private cidadeService: CidadeService,
                private eventManager: EventManager,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load(id) {
        console.log("Load ", id);
        this.cidade = new Cidade();
        if (id) {
            this.cidadeService.find(id).subscribe(cidade => {
                console.log("Load ", cidade);
                this.cidade = cidade;
            });
        }
    }

    clear() {
        this.previousState();
    }

    save() {
        this.isSaving = true;
        if (this.cidade.id !== undefined) {
            this.cidadeService.update(this.cidade)
                .subscribe((res: Cidade) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.cidadeService.create(this.cidade)
                .subscribe((res: Cidade) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result: Cidade) {
        this.eventManager.broadcast({name: 'cidadeListModification', content: 'OK'});
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
