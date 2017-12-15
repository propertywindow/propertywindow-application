import { User } from './user';

export class Conversation {
	author: User;
	message?: string;
	datetime: string;
	type: string;
}
