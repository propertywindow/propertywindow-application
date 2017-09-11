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
import {AgentService} from '../../../shared/services/engine/agent/agent.service';
import {Agent} from '../../../shared/model/agent';
import {ServiceService} from '../../../shared/services/engine/service/service.service';
import {ServiceGroup} from '../../../shared/model/serviceGroup';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './agents.component.html',
    styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
    service: ServiceGroup;
    rows: Agent[] = [];
    selected = [];
    temp = [];
    searchValue: string = null;
    isSearchActive: boolean = false;
    isToolbarActive: boolean = false;
    itemsSelected: string = '';
    itemCount: number = 0;

    constructor(
        private agentService: AgentService,
        private serviceService: ServiceService
    ) {
    }

    ngOnInit() {
        this.serviceService.getServiceGroup(4)
            .subscribe(data => {
                this.service = data;
            });
        this.agentService.getAgents()
            .subscribe(data => {
                this.temp = [...data];
                this.rows = data;
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
