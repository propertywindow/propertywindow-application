import { User } from './user';
import { Agent } from './agent';
export class Blacklist {
	id: number;
	user_id: number;
	user: User;
	agent_id: number;
	agent: Agent;
	ip: string;
	amount: number;
	date: string;
}
