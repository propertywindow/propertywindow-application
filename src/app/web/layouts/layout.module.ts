import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LayoutComponent} from './layout/layout.component';
import {HeaderNavComponent} from './header-nav/header-nav.component';
import {PagesComponent} from '../pages/pages.component';
import {AsideNavComponent} from './aside-nav/aside-nav.component';
import {FooterComponent} from './footer/footer.component';
import {QuickSidebarComponent} from './quick-sidebar/quick-sidebar.component';
import {ScrollTopComponent} from './scroll-top/scroll-top.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HrefPreventDefaultDirective} from '../../shared/directives/href-prevent-default.directive';
import {UnwrapTagDirective} from '../../shared/directives/unwrap-tag.directive';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderNavComponent,
        PagesComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
    ],
    exports: [
        LayoutComponent,
        HeaderNavComponent,
        PagesComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        HrefPreventDefaultDirective,
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
    ]
})
export class LayoutModule {
}
