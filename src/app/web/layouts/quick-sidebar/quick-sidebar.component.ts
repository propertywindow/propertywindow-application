import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ConversationService, UserService} from '../../../shared/services';
import {Conversation, Message, User} from '../../../shared/models';
import {Howl} from 'howler'

@Component({
    selector: "app-quick-sidebar",
    templateUrl: "./quick-sidebar.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [ConversationService],
})
export class QuickSidebarComponent implements OnInit, OnDestroy {
    conversation: Conversation;
    messages: Message[] = [];
    user: User;
    recipient: User;
    users: User[] = [];
    message: string;
    isCollapsed = false;

    constructor(private _conversationService: ConversationService, private _userService: UserService) {
    }

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

    // todo: on engine side: create conversation when doesn't exist.
    // todo: only load 10 most recent messages, load more when scrolling up.
    // todo: set read when opening messages, and add read icons
    // todo: add smilies

    getInitialMessages() {
        this._conversationService.getMessages(this.recipient.id)
            .subscribe(
                data => {
                    this.messages = data;
                });

        if (this.messages === null) {
            this._conversationService.sendMessage({
                author_id: this.user.id,
                recipient_id: this.recipient.id,
                message: new Date().toLocaleString(),
                date: null,
                type: 'time'
            });
        }
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
            this._conversationService.newMessages().subscribe(messages => {
                const chatSound = new Howl({
                    src: ['assets/app/media/sounds/blop.mp3'],
                    preload: true,
                    html5: true
                });
                chatSound.play();
                this.messages.push(messages);
            });
        }
    }

    ngOnDestroy() {
        this._conversationService.unsubscribe();
    }
}
