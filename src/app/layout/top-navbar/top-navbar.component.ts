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
    ViewEncapsulation,
    ViewChild, ChangeDetectorRef
} from '@angular/core';
import {GlobalState} from '../../app.state';
import {ConfigService} from '../../shared/services/config/config.service';
import {UserService} from '../../shared/services/engine/user/user.service';
import {User} from '../../shared/model/user';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'app-header',
    templateUrl: './top-navbar.component.html',
    styleUrls: ['./top-navbar.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})

export class TopNavbarComponent implements OnInit {
    public static updateUser: Subject<boolean> = new Subject();
    loggedInUser: User;
    loading: boolean = true;

    constructor(public config: ConfigService,
                private _elementRef: ElementRef,
                private _state: GlobalState,
                private userService: UserService) {
        this._state.subscribe('app.isApp_MobileSidebarLeftOpen', (isApp_MobileSidebarLeftOpen) => {
            this.config.appLayout.isApp_MobileSidebarLeftOpen = isApp_MobileSidebarLeftOpen;
        });
        this._state.subscribe('app.isApp_BackdropVisible', (isApp_BackdropVisible) => {
            this.config.appLayout.isApp_BackdropVisible = isApp_BackdropVisible;
        });
        this._state.subscribe('app.isApp_SidebarRightOpen', (isApp_SidebarRightOpen) => {
            this.config.appLayout.isApp_SidebarRightOpen = isApp_SidebarRightOpen;
        });

        TopNavbarComponent.updateUser.subscribe(res => {
            this.loading = true;
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.userService.getUser(currentUser.id).subscribe(
                data => {
                    this.loggedInUser = data;
                    this.loading = false;
                }
            );
        })
    }

    ngOnInit() {
        TopNavbarComponent.updateUser.next(true);
    }

    toggleAppMobileLeftMenuSidebar() {
        this.config.appLayout.isApp_MobileSidebarLeftOpen = !this.config.appLayout.isApp_MobileSidebarLeftOpen;
        this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
        this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        return false;
    }


    toggleAppRightSidebar() {
        this.config.appLayout.isApp_SidebarRightOpen = !this.config.appLayout.isApp_SidebarRightOpen;
        this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
        this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        return false;
    }
}
