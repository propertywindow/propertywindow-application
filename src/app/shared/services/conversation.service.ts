import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {Conversation, Message} from '../models';
import * as io from 'socket.io-client';
import {UserService} from './user.service';

@Injectable()
export class ConversationService {
    socket: SocketIOClient.Socket;
    messages: Conversation[] = [];

    constructor(private userService: UserService, private http: Http) {
        this.socket = io.connect(environment.ws_url);
        // this.initChat();
    }

    // todo: set read when opening messages, and add read icons

    // initChat() {
    //     this.socket.emit('add-message', {
    //         author: this.user,
    //         message: 'online',
    //         datetime: '',
    //         type: 'event'
    //     });
    // }

    sendMessage(message: Message) {
        this.socket.emit('add-message', message);

        const data = {
            'jsonrpc': '2.0',
            'method': 'createConversation',
            'params': {
                'recipient_id': message.recipient_id,
                'message': message.message,
                'type': message.type
            }
        };

        this.http.post(environment.engineUrl + 'conversation', data, this.jwt()).subscribe();
    }

    getMessages(recipient_id: number): Observable<Message[]> {
        const data = {
            'jsonrpc': '2.0',
            'method': 'getConversationByRecipient',
            'params': {
                'recipient_id': recipient_id
            }
        };
        return this.http
            .post(environment.engineUrl + 'conversation', data, this.jwt())
            .map((response: Response) => response.json().result);
    };

    getNewMessages(): Observable<Message> {
        let observable = new Observable<Message>(messages => {
            this.socket.on('message', (message) => {
                messages.next(message);
            });
        });
        return observable;
    }

    unsubscribe() {
        this.socket.disconnect();
    }



    // private helper methods

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Basic ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }
}
