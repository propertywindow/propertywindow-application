import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ConversationService, UserService} from '../../../shared/services';
import {Conversation, User} from '../../../shared/models';

@Component({
    selector: "app-quick-sidebar",
    templateUrl: "./quick-sidebar.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ConversationService]
})
export class QuickSidebarComponent implements OnInit, OnDestroy {

    conversation: Conversation[] = [];
    user: User;
    message: string;
    connection;

    constructor(private _conversationService: ConversationService, private _userService: UserService) {

    }

    // todo: check if logged in

    sendMessage() {
        this._conversationService.sendMessage({
            author: this.user,
            message: this.message,
            datetime: '',
            type: 'message'
        });
        this.message = '';
    }

    getUser() {
        this._userService.getUser()
            .subscribe(
                data => {
                    this.user = data;
                });
    }

    getInitialMessages() {
        this.connection = this._conversationService.getConversation().subscribe(message => {
            this.conversation.push(message);
        });
    }

    ngOnInit() {
        if (this._userService.verify()) {
            this.getUser();
            this.getInitialMessages();
        }
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
