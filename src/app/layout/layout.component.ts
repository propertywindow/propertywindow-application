import {Component, ViewEncapsulation, ElementRef, OnInit, HostBinding} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {GlobalState} from '../app.state';
import {ConfigService} from '../shared/services/config/config.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class LayoutComponent implements OnInit {

    constructor(
        public config: ConfigService,
        private _elementRef: ElementRef,
        private _state: GlobalState,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}
