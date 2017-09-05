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
    HostBinding
} from '@angular/core';
import {GlobalState} from '../../../app.state';
import {ConfigService} from '../../../shared/services/config/config.service';
import {UserService} from '../../../shared/services/engine/user/user.service';
import {User} from '../../../shared/model/user';

@Component({
    selector: '.content_inner_wrapper',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    title: string = 'Users';
    rows: User[] = [];
    selected = [];
    temp = [];
    searchValue: string = null;
    isSearchActive: boolean = false;
    isToolbarActive: boolean = false;
    itemsSelected: string = '';
    itemCount: number = 0;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(data => {
                this.temp = [...data];
                this.rows = data;
            });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.address.toLowerCase().indexOf(val) !== -1 || !val;
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

    onActivate(event) {
        // console.log('Activate Event', event);
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
}
