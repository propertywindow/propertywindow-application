export class Message {
    id?: number;
    author_id: number;
    recipient_id: number;
    message?: string;
    seen?: boolean;
    date: any;
    type: string;
}