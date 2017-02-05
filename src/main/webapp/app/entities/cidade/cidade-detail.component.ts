import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cidade } from './cidade.model';
import { CidadeService } from './cidade.service';

@Component({
    selector: 'jhi-cidade-detail',
    templateUrl: './cidade-detail.component.html'
})
export class CidadeDetailComponent implements OnInit, OnDestroy {

    cidade: Cidade;
    private subscription: any;

    constructor(
        private cidadeService: CidadeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.cidadeService.find(id).subscribe(cidade => {
            this.cidade = cidade;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
