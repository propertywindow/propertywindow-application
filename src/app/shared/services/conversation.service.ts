import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {Conversation, User} from '../models';
import * as io from 'socket.io-client';
import {UserService} from './user.service';

@Injectable()
export class ConversationService {
    socket: SocketIOClient.Socket;
    messages: Conversation[] = [];
    user: User;

    // todo: rename to conversation, model too

    constructor(private userService: UserService) {
        this.socket = io.connect(environment.ws_url);
        this.getUser();
        // this.initChat();
    }

    // todo: logic to save to db goes here, no need to place in server
    // todo: check if logged in

    // initChat() {
    //     this.socket.emit('add-message', {
    //         author: this.user,
    //         message: 'online',
    //         datetime: '',
    //         type: 'event'
    //     });
    // }

    sendMessage(conversation: Conversation) {
        console.log('test2');
        this.socket.emit('add-message', conversation);
    }

    getConversation(): Observable<Conversation> {
        console.log('test3');
        let observable = new Observable<Conversation>(messages => {
            this.socket.on('message', (conversation) => {
                messages.next(conversation);
            });
        });
        return observable;
    }

    getUser() {
        this.userService.getUser()
            .subscribe(
                data => {
                    this.user = data;
                });
    }

    unsubscribe() {
        this.socket.disconnect();
    }
}
