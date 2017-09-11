import {
    Component,
    ViewEncapsulation,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate,
    ElementRef,
    HostListener
} from '@angular/core';
import {GlobalState} from '../../app.state';
import {ConfigService} from '../../shared/services/config/config.service';
import {ServiceService} from '../../shared/services/engine/service/service.service';
import {ServiceGroup} from '../../shared/model/serviceGroup';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'app-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
    public static updateUser: Subject<boolean> = new Subject();
    loading = true;
    public scrollbarOptions = {
        axis: 'y',
        theme: 'minimal',
        scrollInertia: 0,
        mouseWheel: {preventDefault: true}
    };

    menu: ServiceGroup[] = [];

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private serviceService: ServiceService) {
        this._state.subscribe('app.isCollapsed', isCollapsed => {
            this.config.appLayout.isApp_SidebarLeftCollapsed = isCollapsed;
        });
        LeftSidebarComponent.updateUser.subscribe(res => {
            this.loading = true;
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.serviceService.getMenu().subscribe(
                data => {
                    this.menu = data;
                    this.loading = false;
                }
            );
        })
    }

    ngOnInit() {
        LeftSidebarComponent.updateUser.next(true);
    }

    toggleMenuSideabar() {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
        this._state.notifyDataChanged('app.isCollapsed', this.config.appLayout.isApp_SidebarLeftCollapsed);
        return false;
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
    }
}
