import {User} from './user';

export class Conversation {
    id?: number;
    author: User;
    author_id: number;
    recipient: User;
    recipient_id: number;
    unique_id: number;
}