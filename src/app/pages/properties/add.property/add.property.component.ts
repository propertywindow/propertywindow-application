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
    HostBinding,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './add.property.component.html',
    styleUrls: ['./add.property.component.scss']
})
export class AddPropertyComponent implements OnInit {
    @Input() title: string;

    @Input() hidden: boolean = false;
    @Input() isValid: boolean = true;
    @Input() showNext: boolean = true;
    @Input() showPrev: boolean = true;

    @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();

    language: string[] = ['English', 'French', 'German'];
    myForm: FormGroup;

    private _isActive: boolean = false;
    isDisabled: boolean = true;

    @Input('isActive')
    set isActive(isActive: boolean) {
        this._isActive = isActive;
        this.isDisabled = false;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    isCompleted: boolean = false;

    onStep1Next(event) {
    }

    onStep2Next(event) {
    }

    onStep3Next(event) {
    }

    onComplete(event) {
    }

    onStepChanged(step) {
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            newClient: new FormControl('1', Validators.required),
            newClientGroup: new FormGroup({
                firstName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required)
            }),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('[^ @]*@[^ @]*')
            ]),
            language: new FormControl(),
            address: new FormGroup({
                addressOne: new FormControl('', Validators.required),
                addressTwo: new FormControl('', Validators.required)
            }),
            city: new FormControl()
        });
    }
}
