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
import {ServiceService} from '../../shared/services/engine/service/service.service';
import {ServiceGroup} from '../../shared/model/serviceGroup';
import {ActivityService} from '../../shared/services/engine/log/activity.service';
import {Activity} from '../../shared/model/activity';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
    service: ServiceGroup;
    currentDate: Date;
    date: DateModel;
    DatePickerOptions: DatePickerOptions;
    newProperties: Activity[] = [];
    changedProperties: Activity[] = [];

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private serviceService: ServiceService,
                private activityService: ActivityService) {
        this.serviceService.getServiceGroup(1)
            .subscribe(data => {
                this.service = data;
            });
        this.currentDate = new Date();
        this.DatePickerOptions = new DatePickerOptions();
        this.activityService.getPropertyChanges('create').subscribe(
            data => {
                this.newProperties = data;
            }
        );
        this.activityService.getPropertyChanges('update').subscribe(
            data => {
                this.changedProperties = data;
            }
        );
    }

    ngOnInit() {
    }

}
