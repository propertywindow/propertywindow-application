import {User} from './user';

export class ChatMessage {
    author: User;
    message?: string;
    datetime: string;
}
