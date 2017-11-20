import {NgModule, Optional, SkipSelf} from '@angular/core';

import {UserService} from './user.service';
import {ServiceService} from './service.service';

@NgModule({
    imports: [],
    providers: [
        UserService,
        ServiceService
    ],
    declarations: [],
    exports: []
})
export class ServicesModule {
    constructor(
        @Optional()
        @SkipSelf()
            parentModule: ServicesModule) {
    }
}
