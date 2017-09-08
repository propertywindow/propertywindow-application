import {NgModule, Optional, SkipSelf} from '@angular/core';

import {ConfigService} from './config/config.service';
import {PreloaderService} from './preloader/preloader.service';
import {SpinnerService} from './spinner/spinner.service';

import {UserService} from './engine/user/user.service';
import {AgentService} from './engine/agent/agent.service';
import {ClientService} from './engine/client/client.service';
import {PropertyService} from './engine/property/property.service';
import {ServiceService} from './engine/service/service.service';
import {ActivityService} from './engine/log/activity.service';

@NgModule({
    imports: [],
    providers: [
        ConfigService,
        PreloaderService,
        SpinnerService,
        UserService,
        AgentService,
        ClientService,
        PropertyService,
        ServiceService,
        ActivityService
    ],
    declarations: [],
    exports: []
})
export class ServicesModule {
    constructor(@Optional()
                @SkipSelf()
                    parentModule: ServicesModule) {
    }
}
