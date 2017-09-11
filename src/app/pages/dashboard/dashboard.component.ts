import {
    Component,
    ViewEncapsulation,
    ViewChild,
    OnInit,
    HostListener,
    ElementRef
} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {GlobalState} from '../../app.state';
import {ConfigService} from '../../shared/services/config/config.service';
import {MdSidenav} from '@angular/material';
import {DatePickerOptions, DateModel} from 'ng2-datepicker';
import {NgDateRangePickerOptions} from 'ng-daterangepicker';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
    title: string = 'Dashboard';
    currentDate: Date;
    date: DateModel;
    DatePickerOptions: DatePickerOptions;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState) {
        this.currentDate = new Date();
        this.DatePickerOptions = new DatePickerOptions();
    }

    ngOnInit() {
    }

}
