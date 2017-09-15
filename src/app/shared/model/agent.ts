import {AgentGroup} from './agentGroup';
export class Agent {
    id: number;
    agent_group_id: number;
    agent_group: AgentGroup;
    agent_user_id: number;
    name: string;
    office: string;
    address: string;
    street: string;
    house_number: string;
    postcode: string;
    city: string;
    country: string;
    property_limit: number;
    phone: string;
    fax: string;
    email: string;
    website: number;
    logo: string;
    espc: boolean;
    webprint: boolean;
    archived: boolean;
    created: string;
}