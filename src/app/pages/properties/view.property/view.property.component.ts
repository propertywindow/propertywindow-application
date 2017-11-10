import {Component, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PropertyService} from '../../../shared/services/engine/property/property.service';
import {Property} from '../../../shared/model/property';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './view.property.component.html',
    styleUrls: ['./view.property.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ViewPropertyComponent implements OnInit {

    property: Property;
    loading = true;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private route: ActivatedRoute,
                private router: Router,
                private propertyService: PropertyService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.propertyService.getProperty(+params['id']))
            .subscribe((data) => {
                this.loading = false;
                this.property = data;
            }
        );
    }

}
