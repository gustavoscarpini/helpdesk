import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CidadeDetailComponent } from '../../../../../../main/webapp/app/entities/cidade/cidade-detail.component';
import { CidadeService } from '../../../../../../main/webapp/app/entities/cidade/cidade.service';
import { Cidade } from '../../../../../../main/webapp/app/entities/cidade/cidade.model';

describe('Component Tests', () => {

    describe('Cidade Management Detail Component', () => {
        let comp: CidadeDetailComponent;
        let fixture: ComponentFixture<CidadeDetailComponent>;
        let service: CidadeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CidadeDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    CidadeService
                ]
            }).overrideComponent(CidadeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CidadeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CidadeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Cidade(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cidade).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
