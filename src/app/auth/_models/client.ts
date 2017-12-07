import {Agent} from './agent';
import {User} from './user';
export class Client {
    id: number;
    user_id: number;
    user: User;
    agent_id: number;
    agent: Agent;
    full_name: string;
    first_name: string;
    last_name: string;
    address: string;
    street: string;
    house_number: string;
    postcode: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    transparency: boolean;
    created: string;
}
