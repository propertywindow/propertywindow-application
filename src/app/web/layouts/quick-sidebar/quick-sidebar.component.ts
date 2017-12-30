import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ConversationService, UserService} from '../../../shared/services';
import {Conversation, Message, User} from '../../../shared/models';
import {Howl} from 'howler'

@Component({
    selector: "app-quick-sidebar",
    templateUrl: "./quick-sidebar.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ConversationService]
})
export class QuickSidebarComponent implements OnInit, OnDestroy {

    conversation: Conversation;
    messages: Message[] = [];
    user: User;
    recipient: User;
    users: User[] = [];
    message: string;
    connection;
    isCollapsed = false;

    constructor(private _conversationService: ConversationService, private _userService: UserService) {

        const blop = new Howl({
            src: ['assets/app/media/sounds/blop.mp3'],
            preload: true,
            html5 :true
        });

    }

    // todo: add smilies

    // todo: strip from html or dangerous code
    
    sendMessage() {
        if (this.message) {
            this._conversationService.sendMessage({
                author_id: this.user.id,
                recipient_id: this.recipient.id,
                message: this.message,
                date: null,
                type: 'message'
            });
        }
        this.message = '';
    }

    getUser() {
        this._userService.getUser()
            .subscribe(
                data => {
                    this.user = data;
                });
    }

    getColleagues() {
        this._userService.getColleagues()
            .subscribe(
                data => {
                    this.users = data;
                });
    }


    getInitialMessages() {
        this._conversationService.getMessages(this.recipient.id)
            .subscribe(
                data => {
                    this.messages = data;
                });

        // blop.play();

        this.connection = this._conversationService.getNewMessages().subscribe(messages => {
            this.messages.push(messages);
        });
    }

    toggleChat(recipient: User) {
        this.isCollapsed = !this.isCollapsed;
        this.messages = [];
        if (recipient) {
            this.recipient = recipient;
            this.getInitialMessages();
        }
    }

    ngOnInit() {
        if (this._userService.verify()) {
            this.getUser();
            this.getColleagues();
        }
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
