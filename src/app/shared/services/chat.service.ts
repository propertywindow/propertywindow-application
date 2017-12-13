import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {ChatMessage} from '../models';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
    socket: SocketIOClient.Socket;
    messages: ChatMessage[] = [];

    constructor() {
        // this.socket = io.connect(environment.ws_url);
    }

    // todo: logic to save to db goes here, no need to place in server

    sendMessage(chatMessage: ChatMessage) {
        // this.socket.emit('add-message', chatMessage);
    }

    getMessages(): Observable<ChatMessage> {

        // let observable = new Observable<ChatMessage>(messages => {
        //     this.socket.on('message', (chatMessage) => {
        //         messages.next(chatMessage);
        //     });
        // });
        // return observable;
    }

    getUsers() {
        // let observable = new Observable(observer => {
        //     this.socket.on('users-changed', (data) => {
        //         observer.next(data);
        //     });
        // });
        // return observable;
    }

    unsubscribe() {
        // this.socket.disconnect();
    }
}
