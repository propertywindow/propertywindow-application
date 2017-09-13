import {Component, ViewEncapsulation, ElementRef, OnInit, HostBinding, ViewChild} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {GlobalState} from '../app.state';
import {ConfigService} from '../shared/services/config/config.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class LayoutComponent implements OnInit {
    @ViewChild('idleModal') public idleModal: ModalDirective;
    timeOutTime = '';

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private router: Router,
                private idle: Idle,
                private titleService: Title) {
    }

    ngOnInit() {
        this.idle.setIdle(900);
        this.idle.setTimeout(100);
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        this.idle.onIdleEnd.subscribe(() => {
            this.titleService.setTitle('Property Window');
            this.idleModal.hide();
        });
        this.idle.onTimeout.subscribe(() => {
            this.idleModal.hide();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            localStorage.setItem('currentUser', JSON.stringify({
                id: currentUser.id,
                email: currentUser.email,
                token: currentUser.token,
                locked: true
            }));
            window.location.href = '/lock';
        });

        this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.timeOutTime = countdown;
            this.titleService.setTitle('Locked in ' + countdown + ' seconds');
            this.idleModal.show();
        });

        this.idle.watch();

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
}
