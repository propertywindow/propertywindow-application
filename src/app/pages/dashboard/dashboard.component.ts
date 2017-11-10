import {Component, ViewEncapsulation, ViewChild, OnInit, HostListener, ElementRef} from '@angular/core';
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
import {Property} from '../../shared/model/property';
import {PropertyService} from '../../shared/services/engine/property/property.service';
import {AgmMap} from '@agm/core';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
    @ViewChild(AgmMap) private map: any;
    navMode = 'side';
    lat: number = 55.924676;
    lng: number = -3.199477;
    service: ServiceGroup;
    currentDate: Date;
    date: DateModel;
    DatePickerOptions: DatePickerOptions;
    newProperties: Property[] = [];
    changedProperties: Property[] = [];
    properties: Property[] = [];

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private serviceService: ServiceService,
                private activityService: ActivityService,
                private propertyService: PropertyService) {
    }

    ngOnInit() {
        this.serviceService.getServiceGroup(1)
            .subscribe(services => {
                this.service = services;
            });
        this.currentDate = new Date();
        this.DatePickerOptions = new DatePickerOptions();
        this.activityService.getPropertyChanges('create').subscribe(
            data => {
                const property: Property[] = [];
                for (const entry of data) {
                    property.push(JSON.parse(entry.new_value));
                }
                this.newProperties = property;
            }
        );
        this.activityService.getPropertyChanges('update').subscribe(
            data => {
                const property: Property[] = [];
                for (const entry of data) {
                    property.push(JSON.parse(entry.new_value));
                }
                this.changedProperties = property;
            }
        );
        this.propertyService.getProperties().subscribe(
            properties => {
                this.properties = properties;
            }
        );

        window.scrollTo(0, 0);
    }

    private redrawMap() {
        this.map.triggerResize()
            .then(() => this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
    }
    private selectMapTab() {
        this.redrawMap();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.redrawMap();
    }

}

