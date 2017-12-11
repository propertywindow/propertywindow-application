import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ChatService, UserService} from '../../../shared/services';
import {ChatMessage, User} from '../../../shared/models';

@Component({
    selector: "app-quick-sidebar",
    templateUrl: "./quick-sidebar.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ChatService]
})
export class QuickSidebarComponent implements OnInit, OnDestroy {

    messages: ChatMessage[] = [];
    user: User;
    message: string;
    connection;

    constructor(private chatService: ChatService, private userService: UserService) {

    }

    sendMessage() {
        // this.chatService.sendMessage({
        //     author: this.user,
        //     message: this.message,
        //     datetime: ''
        // });
        // this.message = '';
    }

    getUser() {
        this.userService.getUser()
            .subscribe(
                data => {
                    this.user = data;
                });
    }

    // getInitialMessages() {
    //     this.connection = this.chatService.getMessages().subscribe(message => {
    //         this.messages.push(message);
    //     });
    // }

    ngOnInit() {
        this.getUser();
        // this.getInitialMessages();
    }

    ngOnDestroy() {
        // this.connection.unsubscribe();
    }
}