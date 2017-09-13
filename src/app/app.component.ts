import {
    Component,
    HostBinding,
    OnInit,
    HostListener,
    ViewContainerRef
} from '@angular/core';
import {Title} from '@angular/platform-browser';
declare var $: any;
import {GlobalState} from './app.state';
import {ConfigService} from './shared/services/config/config.service';
import {PreloaderService} from './shared/services/preloader/preloader.service';
import {SpinnerService} from './shared/services/spinner/spinner.service';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.app_sidebar-menu-collapsed')
    get isApp_SidebarLeftCollapsed() {
        return this.config.appLayout.isApp_SidebarLeftCollapsed;
    }

    @HostBinding('class.app_sidebar-left-open')
    get isApp_MobileSidebarLeftOpen() {
        return this.config.appLayout.isApp_MobileSidebarLeftOpen;
    }

    @HostBinding('class.sidebar-overlay-open')
    get isApp_SidebarRightOpen() {
        return this.config.appLayout.isApp_SidebarRightOpen;
    }

    constructor(private _state: GlobalState,
                public config: ConfigService,
                private viewContainerRef: ViewContainerRef,
                private _spinner: SpinnerService,
                private titleService: Title) {
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    ngOnInit() {
        $(document).on('click', '[href="#"]', e => e.preventDefault());
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        if (this._shouldMenuReset()) {
            this.config.appLayout.isApp_SidebarLeftCollapsed = false;
        }
    }

    private _shouldMenuReset(): boolean {
        return window.innerWidth <= this.config.breakpoint.desktopLG;
    }

    public ngAfterViewInit(): void {
        PreloaderService.load().then(values => {
            this._spinner.hide();
        });
    }
}
