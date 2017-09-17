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
    HostBinding, ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {AgentService} from '../../../shared/services/engine/agent/agent.service';
import {Agent} from '../../../shared/model/agent';
import {ServiceService} from '../../../shared/services/engine/service/service.service';
import {ServiceGroup} from '../../../shared/model/serviceGroup';
import {AuthenticationService} from '../../../shared/authentication/authentication.service';
import {TopNavbarComponent} from '../../../layout/top-navbar/top-navbar.component';
import {LeftSidebarComponent} from '../../../layout/left-sidebar/left-sidebar.component';
import {ImpersonateComponent} from '../../../layout/top-navbar/impersonate/impersonate.component';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import swal from 'sweetalert2';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './agents.component.html',
    styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
    public static doImpersonate: Subject<boolean> = new Subject();
    public pageLengths: number[] = [
        10,
        25,
        50,
        100
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    service: ServiceGroup;
    rows: Agent[] = [];
    selected = [];
    temp = [];
    loading: boolean = true;
    searchValue: string = null;
    isSearchActive: boolean = false;
    isToolbarActive: boolean = false;
    itemsSelected: string = '';
    itemCount: number = 0;
    impersonateId: number;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private agentService: AgentService,
                private serviceService: ServiceService) {
        AgentsComponent.doImpersonate.subscribe(res => {
            swal({
                title: 'Impersonating',
                text: 'One moment please..',
                type: 'success',
                timer: 3000,
                customClass: 'animated tada',
                showConfirmButton: false,
            }).then(
                function () {},
                function (dismiss) {}
            );
            this.authenticationService.impersonate(this.impersonateId)
                .subscribe(result => {
                    if (result === true) {
                        TopNavbarComponent.updateUser.next(true);
                        LeftSidebarComponent.updateUser.next(true);
                        ImpersonateComponent.updateUser.next(true);
                        this.router.navigate(['/users/users']);
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'You are not allowed to impersonate',
                            type: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonClass: 'btn btn-danger',
                            buttonsStyling: false
                        });
                    }
                });
        })
    }

    ngOnInit() {
        this.table.limit = 10;
        this.serviceService.getServiceGroup(4)
            .subscribe(data => {
                this.service = data;
            });
        this.agentService.getAgents()
            .subscribe(data => {
                this.temp = [...data];
                this.rows = data;
                this.loading = false;
            });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
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

    toggleExpandGroup(group) {
        this.table.groupHeader.toggleExpandGroup(group);
    }

    onDetailToggle(event) {
    }

    onActivate(event) {
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

    impersonate(id) {
        this.impersonateId = id;
        swal({
            title: 'Are you sure?',
            text: 'You\'re about to impersonate this user.',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Impersonate',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-default btn-flat mat-ripple',
            buttonsStyling: false
        }).then(function () {
                AgentsComponent.doImpersonate.next(true);
            }, function (dismiss) {}
        )
    }
}
