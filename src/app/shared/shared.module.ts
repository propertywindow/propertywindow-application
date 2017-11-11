import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    StyleModule
} from '@angular/material';
import {NguUtilityModule} from 'ngu-utility/ngu-utility.module';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {MomentModule} from 'angular2-moment';
import {ChartsModule} from 'ng2-charts';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GaugeModule} from 'ng-gauge';
import {FormWizardModule} from 'angular2-wizard';
import {CustomFormsModule} from 'ng2-validation';
import {NgDateRangePickerModule} from 'ng-daterangepicker';
import {DndModule} from 'ng2-dnd';
import {ChartistModule} from 'ng-chartist';
import {FooterComponent} from '../layout/footer/footer.component';
import {AppBackdropComponent} from './components/app_backdrop/app_backdrop.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        MdCoreModule,
        MdDatepickerModule,
        MdDialogModule,
        MdExpansionModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdNativeDateModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule,
        StyleModule,
        NguUtilityModule,
        ChartsModule,
        NgxChartsModule,
        GaugeModule,
        FormWizardModule,
        CustomFormsModule,
        ChartistModule,
        NgDateRangePickerModule,
        BsDropdownModule.forRoot(),
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        MalihuScrollbarModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        DndModule.forRoot()
    ],
    declarations: [
        AppBackdropComponent,
        FooterComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        MomentModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        MdCoreModule,
        MdDatepickerModule,
        MdDialogModule,
        MdExpansionModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdNativeDateModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule,
        StyleModule,
        NguUtilityModule,
        AppBackdropComponent,
        FooterComponent,
        ReactiveFormsModule,
        TabsModule,
        BsDropdownModule,
        AlertModule,
        MalihuScrollbarModule,
        ModalModule,
        PopoverModule,
        FormWizardModule,
        ChartsModule,
        NgxChartsModule,
        GaugeModule,
        CustomFormsModule,
        ChartistModule,
        DndModule,
        NgDateRangePickerModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
