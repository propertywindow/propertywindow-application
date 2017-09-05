import {
    Component,
    ViewEncapsulation,
    ViewChild,
    OnInit,
    HostListener,
    ElementRef
} from '@angular/core';
import {GlobalState} from '../../app.state';
import {ConfigService} from '../../shared/services/config/config.service';
import {MdSidenav} from '@angular/material';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
    title: string = 'Dashboard';
    currentDate: Date;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState) {
        this.currentDate = new Date();
    }

    ngOnInit() {
    }

}
