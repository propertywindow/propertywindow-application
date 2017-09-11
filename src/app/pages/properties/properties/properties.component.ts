import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate,
    ElementRef,
    HostListener,
    HostBinding
} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {PropertyService} from '../../../shared/services/engine/property/property.service';
import {Property} from '../../../shared/model/property';
import {ServiceService} from '../../../shared/services/engine/service/service.service';
import {ServiceGroup} from '../../../shared/model/serviceGroup';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
    service: ServiceGroup;
    rows: Property[] = [];
    selected = [];
    temp = [];
    loading: boolean = true;
    searchValue: string = null;
    isSearchActive: boolean = false;
    isToolbarActive: boolean = false;
    itemsSelected: string = '';
    itemCount: number = 0;

    constructor(
        private propertyService: PropertyService,
        private serviceService: ServiceService
    ) {
    }

    ngOnInit() {
        this.serviceService.getServiceGroup(2)
            .subscribe(data => {
                this.service = data;
            });
        this.propertyService.getProperties()
            .subscribe(data => {
                this.temp = [...data];
                this.rows = data;
                this.loading = false;
            });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.address.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
    }

    onSelect({selected}) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        if (selected.length === 1) {
            this.isToolbarActive = true;
            this.itemCount = selected.length;
            this.itemsSelected = 'Item Selected';
        } else if (selected.length > 0) {
            this.isToolbarActive = true;
            this.itemCount = selected.length;
            this.itemsSelected = 'Items Selected';
        } else {
            this.isToolbarActive = false;
        }
    }

    triggerClose(event) {
        this.rows = this.temp;
        this.searchValue = '';
        this.isSearchActive = !this.isSearchActive;
    }

    onActivate(event) {
        // console.log('Activate Event', event);
    }

    add() {
        this.selected.push(this.rows[1], this.rows[3]);
    }

    update() {
        this.selected = [this.rows[1], this.rows[3]];
    }

    remove() {
        this.selected = [];
    }
}
