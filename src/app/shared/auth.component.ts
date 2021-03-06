import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, AlertService, UserService} from "./services";
import {AlertComponent} from "./alert/alert.component";
import {LoginCustom} from "./helpers/login-custom";
import {Helpers} from "../helpers";
import {ScriptLoaderService} from './services/script-loader.service';

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './templates/login.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    @ViewChild('alertSignin', {read: ViewContainerRef}) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', {read: ViewContainerRef}) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', {read: ViewContainerRef}) alertForgotPass: ViewContainerRef;

    constructor(private _router: Router,
                private _script: ScriptLoaderService,
                private _userService: UserService,
                private _route: ActivatedRoute,
                private _authService: AuthenticationService,
                private _alertService: AlertService,
                private _cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.model.remember = true;
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/app/base/scripts.bundle.js'
        ])
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        this.loading = true;
        this._authService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    if (data.token) {
                        this._router.navigate([this.returnUrl]);
                    } else {
                        this.showAlert('alertSignin');
                        this._alertService.error('Incorrect login details');
                        this.loading = false;
                    }
                },
                error => {
                    this.showAlert('alertSignin');
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

    signup() {
        this.loading = true;
        this._userService.create(this.model)
            .subscribe(
                data => {
                    this.showAlert('alertSignin');
                    this._alertService.success('Thank you. To complete your registration please check your email.', true);
                    this.loading = false;
                    LoginCustom.displaySignInForm();
                    this.model = {};
                },
                error => {
                    this.showAlert('alertSignup');
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

    forgotPass() {
        this.loading = true;
        this._userService.forgotPassword(this.model.email)
            .subscribe(
                data => {
                    this.showAlert('alertSignin');
                    this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
                    this.loading = false;
                    LoginCustom.displaySignInForm();
                    this.model = {};
                },
                error => {
                    this.showAlert('alertForgotPass');
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

    showAlert(target) {
        this[target].clear();
        let factory = this._cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}
