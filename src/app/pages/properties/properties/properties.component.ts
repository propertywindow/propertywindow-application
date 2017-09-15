import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {PropertyService} from '../../../shared/services/engine/property/property.service';
import {Property} from '../../../shared/model/property';
import {ServiceService} from '../../../shared/services/engine/service/service.service';
import {ServiceGroup} from '../../../shared/model/serviceGroup';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
    public pageLengths: number[] = [
        10,
        25,
        50,
        100
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;
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

    constructor(private router: Router,
                private propertyService: PropertyService,
                private serviceService: ServiceService) {
    }

    ngOnInit() {
        this.table.limit = 10;
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
        if (event.type === 'click') {
            this.router.navigate(['/properties/view', event.row.id]);
        }

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

    selectPageLength(value) {
        this.table.limit = value;
        this.table.offset = 0;
        this.rows = this.rows.slice();
    }

}
